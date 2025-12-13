from typing import Tuple, List
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel


class ListUsersService:
    """Service để lấy danh sách người dùng với phân trang."""

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def list_users(self, skip: int = 0, limit: int = 100) -> Tuple[List[UserModel], int]:
        """
        Lấy danh sách người dùng với phân trang.
        
        Args:
            skip: Số lượng bản ghi bỏ qua
            limit: Số lượng bản ghi tối đa trả về
            
        Returns:
            Tuple (danh sách users, tổng số users)
        """
        users, total = await self.user_repo.get_all(skip=skip, limit=limit)
        return users, total

