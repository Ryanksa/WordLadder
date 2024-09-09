from flask import Flask, request, Response
import json
import urllib
import random

app = Flask(__name__)

def diff_by_one(word1, word2):
    diff = 0
    for a, b in zip(word1, word2):
        if a != b:
            diff += 1
        if diff > 1:
            return False
    return diff == 1

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.post("/api/validate")
def validate():
    word_to_validate = request.json.get("word_to_validate").lower()
    current_ladder = [word.lower() for word in request.json.get("current_ladder")]
    end_word = request.json.get("end_word")

    if word_to_validate is None or current_ladder is None or len(current_ladder) == 0 or end_word is None:
        return Response(json.dumps({"error": "Missing required fields", "valid_word": "False"}), status=400)

    if len(word_to_validate) != 4:
        return Response(json.dumps({"error": "Word must be 4 characters long", "valid_word": "False"}), status=400)

    if word_to_validate in current_ladder:
        return Response(json.dumps({"error": "Word already in ladder", "valid_word": "False"}), status=400)

    if not diff_by_one(word_to_validate, current_ladder[-1]):
        return Response(json.dumps({"error": "Word must be exactly one letter different", "valid_word": "False"}), status=400)

    if word_to_validate == end_word:
        return Response(json.dumps({ "valid_word": "True"}), status=200)

    # Maybe don't have this part in the final version
    with open('public/4-letter.txt') as f:
        words = f.read().splitlines()
        if word_to_validate in words:
            return Response(json.dumps({"valid_word": "True"}), status=200)

    try:
        req = urllib.request.Request(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word_to_validate}", headers={'User-Agent' : "Magic Browser"}) 
        word_check = urllib.request.urlopen( req ).status
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return Response(json.dumps({"error": "Word not found in dictionary", "valid_word": "False"}), status=404)
        else:
            return Response(json.dumps({"error": "An error occurred", "valid_word": "False"}), status=500)

    return Response(json.dumps({"valid_word": True}), status=200)

@app.get("/api/generate_game")
def generate_game():
    with open('public/4-letter.txt') as f:
        words = f.read().splitlines()
        start_word = random.choice(words)
        end_word = random.choice(words)
        return Response(json.dumps({"start_word": start_word, "end_word": end_word}), status=200)