import sqlite3
import pandas as pd

conn = sqlite3.connect("../crime_intel.db")

df = pd.read_sql("SELECT * FROM suspects", conn)
print(df)

conn.close()
