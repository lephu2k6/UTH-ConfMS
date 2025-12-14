import smtplib
import asyncio
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from config import settings

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
        self.from_email = settings.SMTP_FROM_EMAIL
        self.from_name = settings.SMTP_FROM_NAME
        self.frontend_url = settings.FRONTEND_URL
        
        # Kiểm tra cấu hình
        if not self.smtp_user or not self.smtp_password:
            logger.warning("SMTP chưa được cấu hình đầy đủ. Kiểm tra biến môi trường SMTP_USER và SMTP_PASSWORD.")

    def _create_verification_email(self, to_email: str, verification_token: str) -> MIMEMultipart:
        """Tạo email xác thực"""
        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Xác thực email đăng ký tài khoản UTH-ConfMS'
        msg['From'] = f"{self.from_name} <{self.from_email}>"
        msg['To'] = to_email

        verification_url = f"{self.frontend_url}/verify-email?token={verification_token}"

        # Nội dung email dạng text
        text_content = f"""
        Chào bạn,
        
        Cảm ơn bạn đã đăng ký tài khoản tại UTH-ConfMS.
        
        Vui lòng click vào link sau để xác thực email của bạn:
        {verification_url}
        
        Link này sẽ hết hạn sau 30 phút.
        
        Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.
        
        Trân trọng,
        Đội ngũ UTH-ConfMS
        """

        # Nội dung email dạng HTML
        html_content = f"""
        <html>
          <body>
            <h2>Xác thực email đăng ký tài khoản</h2>
            <p>Chào bạn,</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>UTH-ConfMS</strong>.</p>
            <p>Vui lòng click vào nút bên dưới để xác thực email của bạn:</p>
            <p>
              <a href="{verification_url}" 
                 style="background-color: #4CAF50; color: white; padding: 14px 20px; 
                        text-decoration: none; display: inline-block; border-radius: 4px;">
                Xác thực email
              </a>
            </p>
            <p>Hoặc copy link sau vào trình duyệt:</p>
            <p><a href="{verification_url}">{verification_url}</a></p>
            <p><small>Link này sẽ hết hạn sau 30 phút.</small></p>
            <p>Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
            <hr>
            <p><small>Trân trọng,<br>Đội ngũ UTH-ConfMS</small></p>
          </body>
        </html>
        """

        part1 = MIMEText(text_content, 'plain', 'utf-8')
        part2 = MIMEText(html_content, 'html', 'utf-8')

        msg.attach(part1)
        msg.attach(part2)

        return msg

    def _send_email_sync(self, msg: MIMEMultipart) -> bool:
        """Gửi email đồng bộ (chạy trong thread riêng)"""
        try:
            logger.info(f"Đang kết nối SMTP: {self.smtp_host}:{self.smtp_port}")
            with smtplib.SMTP(self.smtp_host, self.smtp_port, timeout=10) as server:
                logger.info("Đang bật STARTTLS...")
                server.starttls()
                logger.info(f"Đang đăng nhập với user: {self.smtp_user}")
                server.login(self.smtp_user, self.smtp_password)
                logger.info(f"Đang gửi email đến: {msg['To']}")
                server.send_message(msg)
                logger.info("Email đã được gửi thành công!")
                return True
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"Lỗi xác thực SMTP: {str(e)}")
            logger.error("Kiểm tra lại SMTP_USER và SMTP_PASSWORD. Với Gmail, cần dùng App Password.")
            raise
        except smtplib.SMTPException as e:
            logger.error(f"Lỗi SMTP: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Lỗi không xác định khi gửi email: {str(e)}")
            raise

    async def send_verification_email(self, to_email: str, verification_token: str) -> bool:
        """Gửi email xác thực (async)"""
        try:
            if not self.smtp_user or not self.smtp_password:
                logger.warning("SMTP chưa được cấu hình. Không thể gửi email.")
                logger.warning("Vui lòng cấu hình SMTP_USER và SMTP_PASSWORD trong file .env")
                return False

            if not self.from_email:
                logger.warning("SMTP_FROM_EMAIL chưa được cấu hình.")
                return False

            logger.info(f"Đang tạo email xác thực cho: {to_email}")
            msg = self._create_verification_email(to_email, verification_token)

            # Chạy SMTP trong thread riêng để không block event loop
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, self._send_email_sync, msg)
            
            return result
        except Exception as e:
            logger.error(f"Lỗi khi gửi email xác thực: {str(e)}", exc_info=True)
            # Không raise exception để không làm gián đoạn quá trình đăng ký
            # Nhưng log lại để debug
            return False

