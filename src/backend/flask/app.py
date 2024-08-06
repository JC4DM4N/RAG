from flask import Flask, jsonify, request
from flask_cors import CORS

from rag_manual import RAG

app = Flask(__name__)
CORS(app)


@app.route("/api/data", methods=["GET"])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


@app.route("/api/data", methods=["POST"])
def post_data():
    received_data = request.json
    response = RAG(
        query=received_data["query"],
        context_urls=received_data["context"],
    )
    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
