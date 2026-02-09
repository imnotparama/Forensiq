from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import random

app = FastAPI(title="Forensiq")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

# Get the absolute path to the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# The database is in the parent directory of this script (crime-intel-system/)
DB_PATH = os.path.join(BASE_DIR, "crime_intel.db")

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

# ---------------- STATS (DASHBOARD) ----------------
@app.get("/api/stats")
def get_stats():
    conn = get_db()
    total_suspects = conn.execute("SELECT COUNT(*) FROM suspects").fetchone()[0]
    high_risk = conn.execute("SELECT COUNT(*) FROM suspects WHERE risk_level = 'High'").fetchone()[0]
    conn.close()
    
    return {
        "active_cases": total_suspects,
        "high_risk_targets": high_risk,
        "clearance_rate": f"{random.randint(40, 85)}%",
        "intel_reports": random.randint(120, 500)
    }

# ---------------- DEBUG ----------------
@app.get("/api/debug/db")
def debug_db():
    import os
    conn = get_db()
    try:
        count = conn.execute("SELECT COUNT(*) FROM suspects").fetchone()[0]
        rows = conn.execute("SELECT * FROM suspects LIMIT 3").fetchall()
        sample = [dict(r) for r in rows]
    except Exception as e:
        count = -1
        sample = str(e)
    finally:
        conn.close()
        
    return {
        "db_path_resolved": os.path.abspath(DB_PATH),
        "db_exists": os.path.exists(DB_PATH),
        "suspect_count": count,
        "sample_data": sample
    }

# ---------------- NETWORK GRAPH (VISUALIZATION) ----------------
@app.get("/api/network/{suspect_id}")
def get_network(suspect_id: int):
    # Mock data for a network graph
    return {
        "nodes": [
            {"id": 1, "label": "Target", "color": "red"},
            {"id": 2, "label": "Associate A", "color": "orange"},
            {"id": 3, "label": "Associate B", "color": "orange"},
            {"id": 4, "label": "Financier", "color": "blue"},
        ],
        "edges": [
            {"from": 1, "to": 2},
            {"from": 1, "to": 3},
            {"from": 2, "to": 4},
        ]
    }

# ---------------- LIVE FEED (REAL-TIME INTEL) ----------------
@app.get("/api/feed")
def get_feed():
    events = [
        "Suspect spotted in Sector 4",
        "Encrypted comms intercepted",
        "Financial transfer flagged: $50k",
        "New alias detected: 'The Ghost'",
        "Vehicle database updated",
        "Drone surveillance active",
    ]
    return [{"id": i, "message": random.choice(events), "timestamp": "Now"} for i in range(5)]