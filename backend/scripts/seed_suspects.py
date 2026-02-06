import sqlite3
import json

suspects = [
    {
        "name": "Ravi Kumar",
        "age": 32,
        "gender": "Male",
        "address": "T. Nagar, Chennai",
        "state": "Tamil Nadu",
        "crimes": ["Chain snatching", "Robbery"],
        "risk_level": "High",
        "last_seen": "Chennai Central"
    },
    {
        "name": "Amit Sharma",
        "age": 28,
        "gender": "Male",
        "address": "Karol Bagh, Delhi",
        "state": "Delhi",
        "crimes": ["Pickpocketing", "Mobile theft"],
        "risk_level": "Medium",
        "last_seen": "ISBT Kashmere Gate"
    }
]

conn = sqlite3.connect("../crime_intel.db")
cur = conn.cursor()

for s in suspects:
    cur.execute("""
        INSERT INTO suspects
        (name, age, gender, address, state, crimes, risk_level, last_seen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        s["name"],
        s["age"],
        s["gender"],
        s["address"],
        s["state"],
        json.dumps(s["crimes"]),
        s["risk_level"],
        s["last_seen"]
    ))

conn.commit()
conn.close()

print("✅ Temporary suspects inserted")
