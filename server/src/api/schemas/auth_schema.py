from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    affiliation: str
    is_reviewer: bool = False


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChairSetupRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    full_name: Optional[str] = None
    email: EmailStr
    affiliation: Optional[str] = None
    is_verified: bool
    is_active: bool
    roles: List[str] = Field(default_factory=list, alias="role_names")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None 
    
    class Config:
        from_attributes = True

class RefreshTokenRequest(BaseModel):
    refresh_token: str
