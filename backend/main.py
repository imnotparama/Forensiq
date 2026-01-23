from fastapi import FastAPI
from app.routes.suspects import router as suspects_router

app = FastAPI(
    title="Crime Intelligence System",
    version="0.1.0"
)

app.include_router(suspects_router)

@app.get("/")
def health_check():
    return {"status": "Backend is running"}
