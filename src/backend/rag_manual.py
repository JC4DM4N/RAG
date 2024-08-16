import os
import requests
from bs4 import BeautifulSoup
import numpy as np
import faiss
import argparse
import json
from typing import List
from nltk.tokenize import sent_tokenize
from transformers import AutoTokenizer, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer

# huggingface model path
SENT_TRANSFORMER_MODEL_PATH = os.getenv("SENT_TRANSFORMERS_MODEL")
LLM_MODEL_PATH = os.getenv("LLM_MODEL")
if not SENT_TRANSFORMER_MODEL_PATH:
    SENT_TRANSFORMER_MODEL_PATH="sentence-transformers/all-MiniLM-L6-v2"
if not LLM_MODEL_PATH:
    LLM_MODEL_PATH = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"


def load_web_page(url):
    print(f"ingesting data from {url}")
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    return soup.text.replace(".", ". ")


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


def RAG(query: str, context_urls: List[str]):
    print("loading sent transformer model...")
    embedding_model = SentenceTransformer(SENT_TRANSFORMER_MODEL_PATH)

    print("loading web page...")
    texts = np.array([chunk for url in context_urls for chunk in chunk_texts(load_web_page(url))])

    print("embedding texts...")
    embeddings = embedding_model.encode(texts)

    # Create a FAISS index
    index = faiss.IndexFlatL2(embeddings.shape[1])  # Using L2 distance metric
    index.add(embeddings)

    embedded_query = embedding_model.encode(query)

    print("searching vector db for context...")
    distances, indices = index.search(np.array([embedded_query]), k=3)

    context = texts[indices[0]]

    print("=" * 50)
    print("Relevant context found:")
    print("-" * 50)
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

    print("=" * 50)
    tokenizer = AutoTokenizer.from_pretrained(LLM_MODEL_PATH)
    llm = AutoModelForCausalLM.from_pretrained(LLM_MODEL_PATH)

    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = llm.generate(inputs, max_new_tokens=25, temperature=0.6, top_p=0.92, do_sample=True)
    result = tokenizer.decode(outputs[0])
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("query", default="What is the capital of the United Kingdom?")
    args = parser.parse_args()

    context_urls = ["https://en.wikipedia.org/wiki/United_Kingdom"]

    RAG(args.query, context_urls)
