from domain.exceptions import AuthenticationError


class EmailVerificationService:
    def __init__(self, user_repo, db_session, jwt_service, email_service):
        self.user_repo = user_repo
        self.db_session = db_session
        self.jwt_service = jwt_service
        self.email_service = email_service

    async def execute(self, token: str) -> None:
        # 1. Decode token
        payload = self.jwt_service.decode_email_verification_token(token)

        if payload.get("sub") != "email_verification":
            raise AuthenticationError("Token xác thực không hợp lệ")

        user_id = payload.get("user_id")
        if not user_id:
            raise AuthenticationError("Token thiếu thông tin người dùng")

        # 2. Lấy user
        user = await self.user_repo.get_by_id(user_id, self.db_session)
        if not user:
            raise AuthenticationError("Người dùng không tồn tại")

        # 3. Nếu đã verify thì bỏ qua (idempotent)
        if user.is_verified:
            return

        # 4. Verify user
        user.is_verified = True
        await self.db_session.commit()
