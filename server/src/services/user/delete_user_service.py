from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from domain.exceptions import UserNotFoundError


class DeleteUserService:
    """Service để xóa người dùng."""

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def delete_user(self, user_id: int) -> None:
        """
        Xóa người dùng khỏi database.
        
        Args:
            user_id: ID của người dùng cần xóa
            
        Raises:
            UserNotFoundError: Nếu không tìm thấy người dùng
        """
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"Người dùng với ID {user_id} không tồn tại.")

        await self.user_repo.delete(user)
        await self.db_session.commit()

