from sqlalchemy.ext.asyncio import AsyncSession
from typing import Tuple
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel
from infrastructure.security.password_hash import Hasher
from infrastructure.security.jwt import JWTService
from domain.exceptions import AuthenticationError


class LoginService:
    def __init__(self, user_repo: UserRepository, db_session: AsyncSession, jwt_service: JWTService):
        self.user_repo = user_repo
        self.db_session = db_session
        self.jwt_service = jwt_service

    async def create_tokens(self, user: UserModel) -> Tuple[str, str]:
        """Tạo Access Token và Refresh Token, lưu Refresh Token Hash vào DB."""
        
        # 1. Tạo Access Token
        access_token = self.jwt_service.create_access_token(
            {"user_id": user.id, "email": user.email, "roles": [role.name for role in user.roles]}
        )

        # 2. Tạo Refresh Token (Chuỗi ngẫu nhiên) và thời gian hết hạn
        refresh_token_plain, expires_at = self.jwt_service.create_refresh_token()
        
        # 3. Hash Refresh Token và lưu vào DB (bảo mật)
        user.refresh_token_hash = Hasher.hash_password(refresh_token_plain)
        user.refresh_token_expires_at = expires_at
        
        await self.user_repo.save(user)
        await self.db_session.commit()
        
        return access_token, refresh_token_plain

    async def authenticate_and_get_tokens(self, email: str, password: str) -> Tuple[str, str]:
        user = await self.user_repo.get_by_email(email)
        if not user:
            raise AuthenticationError("Email hoặc mật khẩu không đúng.")

        if not Hasher.verify_password(password, user.hashed_password):
            raise AuthenticationError("Email hoặc mật khẩu không đúng.")

        if not user.is_active:
            raise AuthenticationError("Tài khoản của bạn đã bị khóa.")

        return await self.create_tokens(user)