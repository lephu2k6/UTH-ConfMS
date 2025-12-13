from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel, RoleModel
from domain.exceptions import UserNotFoundError


class UpdateUserRolesService:
    """Service để cập nhật vai trò của người dùng."""

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def update_user_roles(self, user_id: int, role_ids: List[int]) -> UserModel:
        """
        Cập nhật vai trò của người dùng.
        
        Args:
            user_id: ID của người dùng
            role_ids: Danh sách ID các vai trò mới
            
        Returns:
            UserModel đã được cập nhật vai trò
            
        Raises:
            UserNotFoundError: Nếu không tìm thấy người dùng
        """
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError(f"Người dùng với ID {user_id} không tồn tại.")

        # Lấy các role objects từ database
        new_roles = []
        for role_id in role_ids:
            role = await self.db_session.get(RoleModel, role_id)
            if role:
                new_roles.append(role)

        # Cập nhật roles của user
        user.roles = new_roles

        await self.user_repo.save(user)
        await self.db_session.commit()
        await self.db_session.refresh(user)

        return user

