FROM python:3.8-slim-buster

WORKDIR /app/src/backend

COPY . /app/src/backend/.

# Install curl
RUN apt-get update && apt-get install -y curl

# Update the package list and install essential packages, including C++ compiler and CMake
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m nltk.downloader punkt

ENV PYTHONPATH /app/src/backend

EXPOSE 5000

CMD ["python", "-u", "flask/app.py"]