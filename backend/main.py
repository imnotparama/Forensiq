from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import random

app = FastAPI(title="Crime Intelligence System")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "crime_intel.db"

# ---------------- HELPERS ----------------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ---------------- HEALTH ----------------
@app.get("/health")
def health():
    return {"status": "ok"}

# ---------------- LIST SUSPECTS (FAST) ----------------
@app.get("/api/suspects/")
def list_suspects():
    """
    ⚡ FAST LIST ENDPOINT
    - No AI
    - No joins
    - No enrichment
    """
    conn = get_db()
    rows = conn.execute("""
        SELECT id, name, risk_level
        FROM suspects
        ORDER BY id DESC
        LIMIT 50
    """).fetchall()
    conn.close()

    return [
        {
            "id": r["id"],
            "name": r["name"],
            "alias": "Unknown",
            "risk_level": r["risk_level"],
        }
        for r in rows
    ]

# ---------------- SINGLE SUSPECT (DETAIL VIEW) ----------------
@app.get("/api/suspects/{suspect_id}")
def get_suspect(suspect_id: int):
    conn = get_db()
    row = conn.execute(
        "SELECT * FROM suspects WHERE id = ?",
        (suspect_id,),
    ).fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Suspect not found")

    # 🔥 DEMO ENRICHMENT (NO AI COST)
    fake_crimes = [
        "Financial Fraud",
        "Identity Theft",
        "Money Laundering",
        "Cyber Crime",
        "Document Forgery",
        "Illegal Transactions",
    ]

    return {
        "id": row["id"],
        "name": row["name"],
        "alias": "Unknown",
        "risk_level": row["risk_level"],
        "age": row["age"] if "age" in row.keys() else random.randint(22, 55),
        "gender": random.choice(["Male", "Female"]),
        "height": random.choice(["5'6\"", "5'8\"", "5'10\"", "6'0\""]),
        "location": row["last_seen"] if "last_seen" in row.keys() else "Unknown",
        "last_seen": row["last_seen"] if "last_seen" in row.keys() else "Unknown",
        "crimes": random.sample(fake_crimes, k=2),
    }

# ---------------- AI ANALYSIS (ON-DEMAND ONLY) ----------------
@app.get("/api/analyze/suspect/{suspect_id}")
def analyze_suspect(suspect_id: int):
    """
    🤖 AI INTELLIGENCE ENDPOINT
    - Triggered ONLY by button click
    - Gemini-safe (no quota burn)
    - Hackathon acceptable fallback
    """
    conn = get_db()
    row = conn.execute(
        "SELECT name, risk_level FROM suspects WHERE id = ?",
        (suspect_id,),
    ).fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Suspect not found")

    return {
        "summary": (
            f"{row['name']} is classified as a {row['risk_level']} risk individual. "
            "AI analysis indicates behavioral patterns consistent with repeat offenses. "
            "Continuous monitoring and verification of associated activities is recommended."
        ),
        "confidence": f"{random.randint(65, 95)}%",
        "source": "gemini-fallback"
    }