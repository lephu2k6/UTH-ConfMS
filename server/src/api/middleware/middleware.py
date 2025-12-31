
from fastapi import Depends, HTTPException, Request
from infrastructure.security.jwt import verify_token

def auth_required(request: Request):
    token = request.headers.get("Authorization")

    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    payload = verify_token(token)
    request.state.user_id = payload["user_id"]
    request.state.role = payload["role"]
