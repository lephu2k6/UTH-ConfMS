# src/main.py
from sqlalchemy import text
from fastapi import FastAPI
from infrastructure.databases.postgres import test_connection

app = FastAPI(title="UTH-ConfMS API")

#
@app.on_event("startup")
async def on_startup():
    await test_connection()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id}
