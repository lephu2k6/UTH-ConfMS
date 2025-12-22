from config import settings


class EmailTemplates:

    @staticmethod
    def verify_email(token: str) -> str:
        url = f"{settings.FRONTEND_URL}/verify-email?token={token}"
        return f"""
        <html>
            <body>
                <h2>Xác thực tài khoản</h2>
                <p>Cảm ơn bạn đã đăng ký hệ thống <b>UTH-ConfMS</b>.</p>
                <p>Nhấn nút bên dưới để xác thực email:</p>
                <p>
                    <a href="{url}"
                       style="padding:10px 16px;
                              background:#2563eb;
                              color:white;
                              text-decoration:none;
                              border-radius:6px;">
                        Xác thực tài khoản
                    </a>
                </p>
                <p>Link sẽ hết hạn sau 15 phút.</p>
            </body>
        </html>
        """

    @staticmethod
    def reset_password(token: str) -> str:
        url = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        return f"""
        <html>
            <body>
                <h2>Đặt lại mật khẩu</h2>
                <p>Nhấn link bên dưới để đặt lại mật khẩu:</p>
                <a href="{url}">{url}</a>
            </body>
        </html>
        """

    @staticmethod
    def notification(content: str) -> str:
        return f"<p>{content}</p>"
