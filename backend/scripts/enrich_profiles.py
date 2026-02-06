import pandas as pd
import random
import sqlite3

DB_PATH = "crime_intel.db"

AGES = list(range(21, 65))
GENDERS = ["Male", "Female"]
LOCATIONS = [
    "Chennai", "Delhi", "Mumbai", "Bengaluru",
    "Hyderabad", "Kolkata", "Pune", "Jaipur"
]

CRIME_TYPES = [
    "Fraud", "Property Dispute", "Financial Crime",
    "Contract Violation", "Cyber Offense",
    "Criminal Appeal", "Tax Evasion"
]

def generate_profile(row):
    return {
        "name": row["name"],
        "age": random.choice(AGES),
        "gender": random.choice(GENDERS),
        "location": random.choice(LOCATIONS),
        "risk_level": row["risk_level"],
        "cases": row["cases"],
        "primary_crime": random.choice(CRIME_TYPES),
    }

# Load intelligence output
intel_df = pd.read_csv("intelligence_output.csv")

profiles = intel_df.apply(generate_profile, axis=1)
profiles_df = pd.DataFrame(list(profiles))

# Save to database
conn = sqlite3.connect(DB_PATH)
profiles_df.to_sql("intelligence_profiles", conn, if_exists="replace", index=False)
conn.close()

print("✅ Intelligence profiles generated and stored")
