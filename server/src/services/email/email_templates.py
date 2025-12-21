from config import settings

class EmailTemplates:

    @staticmethod
    def verify_email(token: str) -> str:
        url = f"{settings.FRONTEND_URL}/verify-email?token={token}"
        return f"""
        <h3>Xác thực tài khoản</h3>
        <p>Nhấn nút bên dưới để xác thực:</p>
        <a href="{url}">Xác thực</a>
        """

    @staticmethod
    def reset_password(token: str) -> str:
        url = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        return f"""
        <h3>Đặt lại mật khẩu</h3>
        <p>Nhấn link để đặt lại mật khẩu:</p>
        <a href="{url}">{url}</a>
        """

    @staticmethod
    def notification(content: str) -> str:
        return f"<p>{content}</p>"
