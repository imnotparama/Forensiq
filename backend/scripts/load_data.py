import sqlite3
import pandas as pd
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / "crime_intel.db"
CSV_PATH = Path(__file__).parent / "intelligence_output.csv"

print("Using DB:", DB_PATH)
print("Using CSV:", CSV_PATH)

# Load CSV
df = pd.read_csv(CSV_PATH)

# Add extra columns required by UI / API
df["entity_type"] = "Legal Entity"
df["location"] = "India"
df["summary"] = df.apply(
    lambda r: f"{r['name']} involved in {r['cases']} Supreme Court cases.",
    axis=1
)

# Connect to DB
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS entities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    cases INTEGER,
    risk_level TEXT,
    entity_type TEXT,
    location TEXT,
    summary TEXT
)
""")

# Clear old data (important while developing)
cursor.execute("DELETE FROM entities")

# Insert rows
for _, row in df.iterrows():
    cursor.execute("""
    INSERT INTO entities (name, cases, risk_level, entity_type, location, summary)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        row["name"],
        int(row["cases"]),
        row["risk_level"],
        row["entity_type"],
        row["location"],
        row["summary"]
    ))

conn.commit()
conn.close()

print("✅ Data loaded into crime_intel.db successfully")
