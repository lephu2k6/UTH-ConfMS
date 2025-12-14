from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.security.jwt import JWTService
from infrastructure.email.email_service import EmailService
from domain.exceptions import AuthenticationError


class EmailVerificationService:
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

    async def verify_email(self, token: str) -> bool:
        """Xác thực email từ token"""
        try:
            # Giải mã token
            payload = self.jwt_service.decode_token(token)
            
            # Kiểm tra loại token
            if payload.get("sub") != "email_verification":
                raise AuthenticationError("Token không hợp lệ cho xác thực email.")
            
            user_id = payload.get("user_id")
            if not user_id:
                raise AuthenticationError("Token không chứa thông tin người dùng.")
            
            # Lấy user từ database
            user = await self.user_repo.get_by_id(user_id)
            if not user:
                raise AuthenticationError("Người dùng không tồn tại.")
            
            # Kiểm tra đã xác thực chưa
            if user.is_verified:
                return True  # Đã xác thực rồi, không cần làm gì
            
            # Cập nhật trạng thái xác thực
            user.is_verified = True
            await self.db_session.commit()
            
            return True
            
        except Exception as e:
            if isinstance(e, AuthenticationError):
                raise
            raise AuthenticationError(f"Lỗi khi xác thực email: {str(e)}")
    
    async def resend_verification_email(self, email: str) -> bool:
        """Gửi lại email xác thực"""
        user = await self.user_repo.get_by_email(email)
        if not user:
            raise AuthenticationError("Email không tồn tại trong hệ thống.")
        
        if user.is_verified:
            raise AuthenticationError("Email đã được xác thực rồi.")
        
        # Tạo token mới và gửi email
        verification_token = self.jwt_service.create_email_verification_token(user.id)
        email_sent = await self.email_service.send_verification_email(user.email, verification_token)
        
        if not email_sent:
            raise AuthenticationError("Không thể gửi email. Vui lòng kiểm tra cấu hình SMTP.")
        
        return True

