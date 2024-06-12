import requests
from bs4 import BeautifulSoup
import numpy as np
import faiss
from nltk.tokenize import sent_tokenize
from ctransformers import AutoModelForCausalLM
from sentence_transformers import SentenceTransformer

MODEL_PATH = "../../model_dir/mistral-7b-instruct-v0.2.Q4_K_M.gguf"


def load_data():

    # texts = np.array([
    #     "James is a man",
    #     "Mary is a woman",
    #     "Frankie is a dog",
    #     "James is a Data Scientist",
    #     "James is from Sheffield",
    #     "Mary is from Lincoln",
    #     "Mary has a PhD in statistics",
    #     "Frankie does not have a job",
    #     "Frankie is very chubby"
    # ])

    # with open("article.txt", "r") as f:
    #     lines = f.readlines()
    # texts = np.array([line.replace("\n", "") for line in lines if line.replace("\n", "")])

    return np.array(texts)


def load_web_page(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    return chunk_texts(soup.text)


def chunk_texts(text: str, chunk_size: int = 64, overlap: bool = True):
    """
    Chunks texts into chunks of less than 'chunk_size' words (not tokens). Ensure chunks consist of full sentences.
        If overlap, ensure one sentence overlaps between each chunk.

    :param text: text to chunk.
    :param chunk_size: maximum number of words per chunk.
    :param overlap: if True, ensure one sentence overlaps between each chunk.
    :return:
    """
    sentences = sent_tokenize(text)
    chunks = []
    current_chunk = []
    current_chunk_length = 0
    for sent in sentences:
        if current_chunk_length + len(sent.split()) <= chunk_size:
            current_chunk.append(sent)
            current_chunk_length += len(sent.split())
        elif len(sent.split()) > chunk_size:
            chunks.append(current_chunk)
            chunks.append([sent])
            current_chunk = []
            current_chunk_length = 0
        else:
            chunks.append(current_chunk)
            if overlap:
                current_chunk = [current_chunk[-1], sent]
            else:
                current_chunk = [sent]
            current_chunk_length = sum([len(s.split()) for s in current_chunk])
    return np.array(["\n\n".join(chunk) for chunk in chunks])


if __name__ == "__main__":

    embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    url = "https://www.bbc.co.uk/sport/football/articles/c9ee3rz5r20o"
    texts = load_web_page(url)

    embeddings = embedding_model.encode(texts)

    # Create a FAISS index
    index = faiss.IndexFlatL2(embeddings.shape[1]) # Using L2 distance metric
    index.add(embeddings)

    query = "Tell me what you know about Arsenal"
    embedded_query = embedding_model.encode(query)

    distances, indices = index.search(np.array([embedded_query]), k=3)

    context = texts[indices[0]]

    print("="*50)
    print("Relevant context found:")
    print("-"*50)
    print(context)

    formatted_context = "\n\n".join(context)

    prompt = (f"""
          You are an assistant for question-answering tasks.
          Use the following pieces of retrieved context to
          answer the question.
          If you don't know the answer, just say that you don't know.
          Use three sentences maximum and keep the answer concise.
          Question: {query}
          Context: {formatted_context}
          Answer:"""
    )

    print("="*50)
    llm = AutoModelForCausalLM.from_pretrained(MODEL_PATH, model_type="mistral")
    print(llm(prompt))
