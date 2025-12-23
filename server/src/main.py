import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

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


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Global handler to return a friendly message when our password confirmation validator fails."""
    try:
        errors = exc.errors()
        for err in errors:
            msg = err.get("msg")
            if isinstance(msg, str) and "Mật khẩu xác nhận không khớp" in msg:
                return JSONResponse(status_code=422, content={"message": "Mật khẩu xác nhận không khớp"})
    except Exception:
        pass
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


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
