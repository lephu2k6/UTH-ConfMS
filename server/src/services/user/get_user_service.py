from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel
from domain.exceptions import UserNotFoundError


class GetUserService:
    """Service để lấy thông tin một người dùng theo ID."""

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def get_user_by_id(self, user_id: int) -> UserModel:
        """
        Lấy thông tin người dùng theo ID.
        
        Args:
            user_id: ID của người dùng
            
        Returns:
            UserModel nếu tìm thấy
            
        Raises:
            UserNotFoundError: Nếu không tìm thấy người dùng
        """
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"Người dùng với ID {user_id} không tồn tại.")
        return user

