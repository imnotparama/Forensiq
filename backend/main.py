from fastapi import FastAPI

app = FastAPI(
    title="Crime Intelligence System",
    version="0.1.0"
)

@app.get("/")
def health_check():
    return {"status": "Backend is running"}
