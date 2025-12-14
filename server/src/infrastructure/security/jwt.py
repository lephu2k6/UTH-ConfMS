from datetime import datetime, timedelta
from typing import Dict, Any , Tuple
import jwt
import secrets
from config import settings 
from domain.exceptions import AuthenticationError

class JWTService:
    SECRET_KEY = settings.SECRET_KEY
    ALGORITHM = settings.ALGORITHM
    EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
    REFRESH_EXPIRE_DAYS = settings.REFRESH_TOKEN_EXPIRE_DAYS

    def create_access_token(self, data: Dict[str, Any]) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.EXPIRE_MINUTES)
        to_encode.update({"exp": expire, "sub": "access"})
        
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt

    def decode_token(self, token: str) -> Dict[str, Any]:
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            raise AuthenticationError("Token đã hết hạn.")
        except jwt.JWTError:
            raise AuthenticationError("Token không hợp lệ.")

    def create_refresh_token(self) -> Tuple[str, datetime]:
        """Tạo Refresh Token ngẫu nhiên"""
        refresh_token = secrets.token_urlsafe(32) 
        expires_at = datetime.utcnow() + timedelta(days=self.REFRESH_EXPIRE_DAYS)
        return refresh_token, expires_at

    # hàm tạo token xác thực email nhé các ae!!!
    def create_email_verification_token(self, user_id: int) -> str:
        payload = {
            "user_id": user_id,
            "sub": "email_verification",
            "exp": datetime.utcnow() + timedelta(minutes=30)
        }
        return jwt.encode(payload, self.SECRET_KEY, algorithm=self.ALGORITHM)