import os
import pandas as pd

DATASET_PATH = r"C:\Users\hunte\.cache\kagglehub\datasets\vangap\indian-supreme-court-judgments\versions\36"

print("Scanning for CSV files...\n")

csv_files = []

for root, dirs, files in os.walk(DATASET_PATH):
    for file in files:
        if file.endswith(".csv"):
            full_path = os.path.join(root, file)
            csv_files.append(full_path)
            print("CSV found:", full_path)

print("\nTotal CSV files found:", len(csv_files))

# Load first CSV for inspection
if csv_files:
    print("\nLoading first CSV to inspect structure...\n")
    df = pd.read_csv(csv_files[0])
    print("Columns:\n", df.columns)
    print("\nSample rows:\n", df.head())
