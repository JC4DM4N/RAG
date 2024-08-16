# Retrieval Augmented Generation (RAG) App

A simple RAG app consisting of a React frontend and a python backend served using Flask. The app takes a list of user-defined webpages and responds to queries about the contents of the selected webpages using a chatGPT-style interface.

## Getting Started

### Quickstart Installation

1. <b>Clone the repo</b>
```
git clone https://github.com/JC4DM4N/RAG.git
```
2. <b>Install Docker</b>

The app is containerised using Docker. Install Docker locally by following the steps at: https://docs.docker.com/engine/install/

Once installed, ensure Docker is running by opening the installed app or running:
```
open -a docker
```

3. <b>Build the app in Docker</b>

From within the ```src``` folder run: 
```
docker compose up --build
```

4. <b>Load the app in your browser</b>

Once the Docker build is finished the app should be available at:
```
localhost:3000
```

### Selecting the LLM for use

It is <b><u>strongly recommended</u></b> that you change the LLM which the app uses. By default the app will use the most lightweight LLM available at the time of development (https://huggingface.co/HuggingFaceTB/SmolLM-135M-Instruct). However this LLM's performance is very poor. 

The choice of LLM can be configured within the backend's Dockerfile by changing the environment variable ```LLM_MODEL```. This should be the name of an LLM model available at https://huggingface.co. Alternative open-source LLM's which you may consider are:
* meta-llama/Meta-Llama-3.1-8B-Instruct (https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct)
* mistralai/Mistral-Nemo-Instruct-2407 (https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407)
* TheBloke/Mistral-7B-Instruct-v0.2-GGUF.Q4_K_M.gguf (from https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF)

Note that the larger the LLM the longer the docker build will take, as the models will be downloaded locally, and the longer the model inference will take whenever submitting a query in the frontend.
