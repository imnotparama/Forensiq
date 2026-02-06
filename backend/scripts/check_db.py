import sqlite3
import pandas as pd

DB_PATH = "../crime_intel.db"

conn = sqlite3.connect(DB_PATH)

print("\n--- ENTITIES TABLE ---")
df_entities = pd.read_sql("SELECT * FROM entities LIMIT 10", conn)
print(df_entities)

print("\n--- SUSPECTS TABLE ---")
df_suspects = pd.read_sql("SELECT * FROM suspects LIMIT 10", conn)
print(df_suspects)

conn.close()
