import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from infrastructure.databases.postgres import test_connection
from api.controllers import auth_controller, user_controller, audit_log_controller, conference_controller, deadline_controller

from infrastructure.models import (
    user_model,
    submission_model,  
    conference_model,
    review_model,
    audit_log_model,
    system_model
)

# Cấu hình logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app = FastAPI(title="UTH-ConfMS API")


@app.on_event("startup")
async def on_startup():
    await test_connection()
    # Start background deadline manager
    try:
        from services.deadline.deadline_manager import start_deadline_manager_in_background

        await start_deadline_manager_in_background()
    except Exception:
        # don't fail startup if background task couldn't be started
        pass

    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


#router

app.include_router(auth_controller.router)
app.include_router(user_controller.router)
app.include_router(audit_log_controller.router)
app.include_router(conference_controller.router)
app.include_router(deadline_controller.router)




@app.get("/")
def root():
    return {"message": "Hello World"}
