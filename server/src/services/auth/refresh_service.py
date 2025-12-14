from datetime import datetime
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.security.jwt import JWTService 
from infrastructure.security.password_hash import Hasher 
from domain.exceptions import AuthenticationError
from infrastructure.models.user_model import UserModel
from typing import Dict, Any, Tuple

class RefreshTokenService:
    def __init__(self, db_session: AsyncSession, user_repo: UserRepository, jwt_service: JWTService):
        self.db_session = db_session
        self.user_repo = user_repo
        self.jwt_service = jwt_service

    async def refresh_access_token(self, refresh_token_plain: str) -> Tuple[str, str]:
        
        stmt = select(UserModel).where(
            UserModel.refresh_token_expires_at > datetime.utcnow()
        )
        result = await self.db_session.execute(stmt)
        users = result.scalars().all()
        
        valid_user = None
        for user in users:
            if user.refresh_token_hash and Hasher.verify_password(refresh_token_plain, user.refresh_token_hash):
                valid_user = user
                break
        
        if not valid_user:
            raise AuthenticationError("Refresh Token không hợp lệ hoặc đã hết hạn.")
        valid_user.refresh_token_hash = None
        valid_user.refresh_token_expires_at = None
        await self.db_session.commit()
    
        return await self.jwt_service.create_tokens(valid_user)