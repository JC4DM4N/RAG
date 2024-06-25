FROM python:3.9-slim-buster

WORKDIR /app/src/backend

COPY . /app/src/backend/.

RUN pip install -r requirements.txt

ENV PYTHONPATH /app/src/backend

RUN python flask/app.py