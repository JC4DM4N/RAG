FROM python:3.8-slim-buster

WORKDIR /app/src/backend

COPY . /app/src/backend/.

ENV SENT_TRANSFORMERS_MODEL="sentence-transformers/all-MiniLM-L6-v2"
ENV LLM_MODEL="HuggingFaceTB/SmolLM-135M-Instruct"

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m nltk.downloader punkt
RUN huggingface-cli download $SENT_TRANSFORMERS_MODEL
RUN huggingface-cli download $LLM_MODEL

ENV PYTHONPATH=/app/src/backend

EXPOSE 5000

CMD ["python", "-u", "flask/app.py"]