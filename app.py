import openai
import json
import os

def handler(request):
    body = json.loads(request.body)
    user_input = body.get("message", "")
    
     openai.api_key = os.getenv("OPENAI_API_KEY")    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}]
    )
    
    reply = response['choices'][0]['message']['content']
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"reply": reply})
    }
