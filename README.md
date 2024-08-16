# Retrieval Augmented Generation (RAG) App

A simple RAG app consisting of a React frontend and a python backend served using Flask. The app takes webpages which the user may load into the frontend, and will then respond to the user's queries about the contents of the selected webpages.

## Getting Started

### Installation

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
```commandline
localhost:3000
```
