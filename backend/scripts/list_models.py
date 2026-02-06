import os
import requests
import json

API_KEY = os.getenv("GEMINI_API_KEY")

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"

response = requests.get(url)

print("STATUS:", response.status_code)
print(json.dumps(response.json(), indent=2))
