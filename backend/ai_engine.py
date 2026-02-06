import os

def generate_profile_summary(suspect: dict) -> str:
    """
    Gemini-powered suspect intelligence summary
    """

    from google import genai

    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    prompt = f"""
    Generate a concise intelligence report for the following suspect:

    Name: {suspect['name']}
    Age: {suspect['age']}
    Gender: {suspect['gender']}
    Risk Level: {suspect['risk_level']}
    Last Seen: {suspect['last_seen']}

    Include:
    - Threat assessment
    - Behavioral insight
    - Monitoring recommendation
    """

    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=prompt
    )

    return response.text.strip()
