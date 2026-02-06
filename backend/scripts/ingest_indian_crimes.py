import sqlite3
import csv
import random
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[1] / "crime_intel.db"
CSV_PATH = Path(__file__).resolve().parent / "indian_crimes.csv"  # rename if needed

FIRST_NAMES = [
    "Ravi", "Amit", "Suresh", "Vikram", "Rajesh", "Anil", "Sunil",
    "Karthik", "Manoj", "Arjun", "Rahul", "Deepak", "Naveen"
]

LAST_NAMES = [
    "Kumar", "Sharma", "Singh", "Patel", "Reddy", "Iyer",
    "Verma", "Gupta", "Mehta", "Das"
]

CRIME_RISK_MAP = {
    "murder": "High",
    "rape": "High",
    "robbery": "High",
    "fraud": "Medium",
    "forgery": "Medium",
    "theft": "Low",
    "burglary": "Medium",
}

def random_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"

def random_gender():
    return random.choice(["Male", "Female"])

def random_height():
    return random.choice(["5'4\"", "5'6\"", "5'8\"", "5'10\"", "6'0\""])

def infer_risk(crime):
    crime = crime.lower()
    for key in CRIME_RISK_MAP:
        if key in crime:
            return CRIME_RISK_MAP[key]
    return "Low"

def suspects_per_row(crime):
    crime = crime.lower()
    if "murder" in crime or "rape" in crime:
        return random.randint(5, 8)
    if "robbery" in crime or "fraud" in crime:
        return random.randint(3, 6)
    return random.randint(2, 4)

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Ensure required columns exist
existing_cols = {row[1] for row in cur.execute("PRAGMA table_info(suspects)")}
required_cols = {
    "alias": "TEXT",
    "height": "TEXT",
    "location": "TEXT"
}

for col, col_type in required_cols.items():
    if col not in existing_cols:
        print(f"➕ Adding missing column: {col}")
        cur.execute(f"ALTER TABLE suspects ADD COLUMN {col} {col_type}")

conn.commit()

suspects_created = 0

with open(CSV_PATH, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        state = row.get("State") or row.get("state") or "Unknown"
        crime = row.get("Crime") or row.get("crime") or "Unknown Crime"

        for _ in range(suspects_per_row(crime)):
            name = random_name()
            age = random.randint(18, 55)
            gender = random_gender()
            height = random_height()
            risk = infer_risk(crime)

            cur.execute(
                """
                INSERT INTO suspects
                (name, alias, age, gender, height, location, last_seen, risk_level)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    name,
                    "Unknown",
                    age,
                    gender,
                    height,
                    state,
                    state,
                    risk,
                ),
            )

            suspects_created += 1

conn.commit()
conn.close()

print(f"✅ Successfully ingested {suspects_created} suspect profiles.")
