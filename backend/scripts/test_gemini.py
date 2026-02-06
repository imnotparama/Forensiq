import os
import requests
import json

API_KEY = os.getenv("GEMINI_API_KEY")

MODEL = "models/gemini-pro-latest"

url = (
    "https://generativelanguage.googleapis.com/v1beta/"
    + MODEL
    + ":generateContent?key="
    + API_KEY
)

payload = {
    "contents": [
        {
            "parts": [
                {
                    "text": (
                        "Generate a concise 3-line crime intelligence summary for a suspect. "
                        "Include risk assessment and behavioral pattern."
                    )
                }
            ]
        }
    ]
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, headers=headers, json=payload)

print("STATUS:", response.status_code)
print(json.dumps(response.json(), indent=2))
