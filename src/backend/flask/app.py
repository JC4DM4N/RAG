from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/data", methods=["GET"])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

@app.route("/api/data", methods=["POST"])
def post_data():
    received_data = request.json
    print(received_data)
    return jsonify("This is my response")


if __name__ == "__main__":
    app.run()
