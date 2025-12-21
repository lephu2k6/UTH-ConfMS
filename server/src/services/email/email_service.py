from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.security.jwt import JWTService
from infrastructure.email.email_service import EmailService
from domain.exceptions import AuthenticationError
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
class AuthCommunicationService:
    def __init__(
        self,
        user_repo: UserRepository,
        db_session: AsyncSession,
        jwt_service: JWTService,
        email_service: EmailService = None
    ):
        self.user_repo = user_repo
        self.db_session = db_session
        self.jwt_service = jwt_service
        self.email_service = email_service or EmailService()

    # --- PHẦN XÁC THỰC EMAIL ---
    async def verify_email(self, token: str) -> bool:
        try:
            payload = self.jwt_service.decode_token(token)
            if payload.get("sub") != "email_verification":
                raise AuthenticationError("Token không hợp lệ.")
            
            user_id = payload.get("user_id")
            user = await self.user_repo.get_by_id(user_id)
            if not user or user.is_verified:
                return True 
            
            user.is_verified = True
            await self.db_session.commit()
            return True
        except Exception as e:
            raise AuthenticationError(f"Lỗi xác thực: {str(e)}")

    async def resend_verification_email(self, email: str) -> bool:
        user = await self.user_repo.get_by_email(email)
        if not user or user.is_verified:
            raise AuthenticationError("Email không hợp lệ hoặc đã xác thực.")
        
        token = self.jwt_service.create_email_verification_token(user.id)
        return await self.email_service.send_verification_email(user.email, token)

    # --- PHẦN QUÊN MẬT KHẨU ---
    async def request_password_reset(self, email: str) -> bool:
        user = await self.user_repo.get_by_email(email)
        if not user:
            raise AuthenticationError("Email không tồn tại.")
            
        token = self.jwt_service.create_password_reset_token(user.id)
        return await self.email_service.send_reset_password_email(user.email, token)

    async def reset_password(self, token: str, new_password: str) -> bool:
        """Thực hiện đổi mật khẩu mới bằng token khôi phục"""
        try:
            payload = self.jwt_service.decode_token(token)
            if payload.get("sub") != "password_reset":
                raise AuthenticationError("Token không hợp lệ cho việc đặt lại mật khẩu.")
            user_id = payload.get("user_id")
            user = await self.user_repo.get_by_id(user_id)
            if not user:
                raise AuthenticationError("Người dùng không còn tồn tại.")
            user.hashed_password = pwd_context.hash(new_password)
            await self.db_session.commit()
            return True
            
        except Exception as e:
            if isinstance(e, AuthenticationError):
                raise
            raise AuthenticationError(f"Link đặt lại mật khẩu đã hết hạn hoặc không hợp lệ: {str(e)}")
    # --- PHẦN GỬI TÀI LIỆU/THÔNG BÁO ---
    async def send_user_document(self, user_id: int, title: str, content: str, file_path: str):
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            return False
        return await self.email_service.send_notification(user.email, title, content, file_path)