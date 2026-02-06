import sqlite3

conn = sqlite3.connect("../crime_intel.db")
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS suspects")

conn.commit()
conn.close()

print("🗑️ Old suspects table deleted")
