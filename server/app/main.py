from fastapi import FastAPI
from sqlalchemy import text
from app.db.session import connection
from app.core.config import settings 

app = FastAPI()



@app.on_event("startup")
def on_startup():
    connection()



@app.get("/")
def root():
    return {"message": "UTH-ConfMS API running!"}
