import asyncio
import os
import csv
from datetime import datetime
from config import settings
import asyncpg

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backups'))
TABLES_TO_DUMP = [
    'users', 'roles', 'user_roles', 'submissions', 'submission_files', 'submission_authors', 'history_logs', 'review_question', 'review_answers'
]

async def dump_table(conn, table):
    rows = await conn.fetch(f"SELECT * FROM {table}")
    if not rows:
        print(f"{table}: no rows")
        return
    output_file = os.path.join(OUTPUT_DIR, f"{table}.csv")
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # header
        writer.writerow(rows[0].keys())
        for r in rows:
            writer.writerow([r[k] for k in rows[0].keys()])
    print(f"Wrote {len(rows)} rows to {output_file}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Dumping tables to {OUTPUT_DIR}")
    conn = await asyncpg.connect(settings.DATABASE_URL)
    try:
        for t in TABLES_TO_DUMP:
            try:
                await dump_table(conn, t)
            except Exception as e:
                print(f"Skipping {t}: {e}")
    finally:
        await conn.close()

if __name__ == '__main__':
    asyncio.run(main())
