FROM python:3.9-slim-buster

WORKDIR /app/src/backend

COPY . /app/src/backend/.

# Install curl
RUN apt-get update && apt-get install -y curl

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python -m nltk.downloader punkt

ENV PYTHONPATH /app/src/backend

EXPOSE 5000

CMD ["python", "flask/app.py"]