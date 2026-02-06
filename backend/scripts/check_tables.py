import sqlite3

DB_PATH = "../crime_intel.db"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()

print("Tables in database:")
for t in tables:
    print("-", t[0])

conn.close()
