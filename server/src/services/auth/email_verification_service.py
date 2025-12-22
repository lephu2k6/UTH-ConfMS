class EmailVerificationService:
    def __init__(self, user_repo, db_session, jwt_service, email_service):
        self.user_repo = user_repo
        self.db_session = db_session
        self.jwt_service = jwt_service
        self.email_service = email_service

    async def execute(self, token: str):
        # Bạn có thể thêm logic xác thực email ở đây sau
        pass