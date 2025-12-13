from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel
from domain.exceptions import UserNotFoundError, DuplicateUserError


class UpdateUserService:
    """Service để cập nhật thông tin người dùng."""

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def update_user(
        self,
        user_id: int,
        full_name: Optional[str] = None,
        email: Optional[str] = None,
        affiliation: Optional[str] = None,
        phone_number: Optional[str] = None,
        website_url: Optional[str] = None,
    ) -> UserModel:
        """
        Cập nhật thông tin người dùng.
        
        Args:
            user_id: ID của người dùng cần cập nhật
            full_name: Tên đầy đủ mới
            email: Email mới
            affiliation: Tổ chức mới
            phone_number: Số điện thoại mới
            website_url: URL website mới
            
        Returns:
            UserModel đã được cập nhật
            
        Raises:
            UserNotFoundError: Nếu không tìm thấy người dùng
            DuplicateUserError: Nếu email mới đã tồn tại
        """
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"Người dùng với ID {user_id} không tồn tại.")

        # Kiểm tra email trùng lặp nếu có thay đổi email
        if email and email != user.email:
            existing_user = await self.user_repo.get_by_email(email)
            if existing_user:
                raise DuplicateUserError(f"Email '{email}' đã tồn tại.")

        # Cập nhật các trường nếu được cung cấp
        if full_name is not None:
            user.full_name = full_name
        if email is not None:
            user.email = email
        if affiliation is not None:
            user.affiliation = affiliation
        if phone_number is not None:
            user.phone_number = phone_number
        if website_url is not None:
            user.website_url = website_url

        await self.user_repo.save(user)
        await self.db_session.commit()
        await self.db_session.refresh(user)

        return user

    async def activate_user(self, user_id: int) -> UserModel:
        """
        Kích hoạt người dùng.
        
        Args:
            user_id: ID của người dùng
            
        Returns:
            UserModel đã được kích hoạt
            
        Raises:
            UserNotFoundError: Nếu không tìm thấy người dùng
        """
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"Người dùng với ID {user_id} không tồn tại.")

        user.is_active = True
        await self.user_repo.save(user)
        await self.db_session.commit()
        await self.db_session.refresh(user)

        return user

    async def deactivate_user(self, user_id: int) -> UserModel:
        """
        Vô hiệu hóa người dùng.
        
        Args:
            user_id: ID của người dùng
            
        Returns:
            UserModel đã được vô hiệu hóa
            
        Raises:
            UserNotFoundError: Nếu không tìm thấy người dùng
        """
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"Người dùng với ID {user_id} không tồn tại.")

        user.is_active = False
        await self.user_repo.save(user)
        await self.db_session.commit()
        await self.db_session.refresh(user)

        return user

