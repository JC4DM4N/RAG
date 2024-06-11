from ctransformers import AutoModelForCausalLM
from transformers import AutoModel, AutoTokenizer
import faiss
import numpy as np


MODEL_PATH = "../../model_dir/mistral-7b-instruct-v0.2.Q4_K_M.gguf"

def load_data():

    texts = np.array([
        "James is a man",
        "Mary is a woman",
        "Frankie is a dog",
        "James is a Data Scientist",
        "James is from Sheffield",
        "Mary is from Lincoln",
        "Mary has a PhD in statistics",
        "Frankie does not have a job",
        "Frankie is very chubby"
    ])

    # with open("article.txt", "r") as f:
    #     lines = f.readlines()
    # texts = np.array([line.replace("\n", "") for line in lines if line.replace("\n", "")])

    return texts


if __name__ == "__main__":

    from sentence_transformers import SentenceTransformer
    embedding_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    texts = load_data()

    embeddings = embedding_model.encode(texts)

    # Create a FAISS index
    index = faiss.IndexFlatL2(embeddings.shape[1]) # Using L2 distance metric
    index.add(embeddings)

    query = "Tell me what you know about Mary"
    embedded_query = embedding_model.encode(query)

    distances, indexes = index.search(np.array([embedded_query]), k=3)

    context = texts[indexes[0]]

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
