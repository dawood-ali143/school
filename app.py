from flask import Flask, request, jsonify import openai
app = Flask(name) openai.api_key = "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"
@app.route("/ask", methods=["POST"]) def ask(): user_input = request.json.get("message", "") response = openai.ChatCompletion.create( model="gpt-3.5-turbo", messages=[{"role": "user", "content": user_input}] ) reply = response['choices'][0]'message']['content'] return jsonify({"reply": reply})
if name == "main": app.run(debug=True)
