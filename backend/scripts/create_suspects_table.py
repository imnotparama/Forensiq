import sqlite3

conn = sqlite3.connect("../crime_intel.db")
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS suspects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    gender TEXT,
    address TEXT,
    state TEXT,
    crimes TEXT,
    risk_level TEXT,
    last_seen TEXT,
    profile_summary TEXT
)
""")

conn.commit()
conn.close()

print("✅ suspects table ready")
