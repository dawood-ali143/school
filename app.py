import openai
import json

def handler(request):
    body = json.loads(request.body)
    user_input = body.get("message", "")
    
    openai.api_key = "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"  # Replace with your key
    
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
