import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from infrastructure.databases.postgres import test_connection
from api.controllers import auth_controller, user_controller, audit_log_controller

# Cấu hình logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app = FastAPI(title="UTH-ConfMS API")


@app.on_event("startup")
async def on_startup():
    await test_connection()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)


#router

app.include_router(auth_controller.router)
app.include_router(user_controller.router)
app.include_router(audit_log_controller.router)




@app.get("/")
def root():
    return {"message": "Hello World"}
