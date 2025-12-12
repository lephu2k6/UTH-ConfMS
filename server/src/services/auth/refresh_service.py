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
        
        # 1. Tìm người dùng có hash Refresh Token trùng khớp và chưa hết hạn
        
        # Tìm tất cả user có token chưa hết hạn
        stmt = select(UserModel).where(
            UserModel.refresh_token_expires_at > datetime.utcnow()
        )
        result = await self.db_session.execute(stmt)
        users = result.scalars().all()
        
        # 2. Xác minh Refresh Token (So sánh Hash)
        valid_user = None
        for user in users:
            if user.refresh_token_hash and Hasher.verify_password(refresh_token_plain, user.refresh_token_hash):
                valid_user = user
                break
        
        if not valid_user:
            raise AuthenticationError("Refresh Token không hợp lệ hoặc đã hết hạn.")

        # 3. Thu hồi Token cũ và tạo cặp Token mới
        
        # LƯU Ý BẢO MẬT: Thu hồi token cũ bằng cách xóa hash và thời gian hết hạn
        valid_user.refresh_token_hash = None
        valid_user.refresh_token_expires_at = None
        await self.db_session.commit()
        
        # Tạo cặp token mới
        return await self.jwt_service.create_tokens(valid_user)