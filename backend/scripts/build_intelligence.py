import pandas as pd

DATASET_PATH = r"C:\Users\hunte\.cache\kagglehub\datasets\vangap\indian-supreme-court-judgments\versions\36\judgments.csv"

df = pd.read_csv(DATASET_PATH)

# Clean names
df["pet"] = df["pet"].astype(str).str.strip()
df["res"] = df["res"].astype(str).str.strip()

# Combine petitioners + respondents
names = pd.concat([df["pet"], df["res"]])

# Count appearances
counts = names.value_counts().reset_index()
counts.columns = ["name", "cases"]

# Risk logic
def risk_from_cases(n):
    if n >= 500:
        return "High"
    elif n >= 100:
        return "Medium"
    else:
        return "Low"

counts["risk_level"] = counts["cases"].apply(risk_from_cases)

# Keep top 50 only (important for UI sanity)
counts = counts.head(50)

# Save output
OUTPUT_PATH = "intelligence_output.csv"
counts.to_csv(OUTPUT_PATH, index=False)

print("✅ intelligence_output.csv created")
print(counts.head(10))

