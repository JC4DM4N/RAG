FROM python:3.8-slim-buster

WORKDIR /app/src/backend

COPY . /app/src/backend/.

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m nltk.downloader punkt

ENV PYTHONPATH /app/src/backend

EXPOSE 5000

CMD ["python", "-u", "flask/app.py"]