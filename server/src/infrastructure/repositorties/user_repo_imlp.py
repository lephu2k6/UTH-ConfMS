from typing import Optional, List
from sqlalchemy.future import select
from sqlalchemy import update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel, UserRoleModel, RoleModel
from domain.exceptions import NotFoundError 


class UserRepositoryImpl(UserRepository):
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def get_by_id(self, user_id: int) -> Optional[UserModel]:
        stmt = select(UserModel).where(UserModel.id == user_id)
        result = await self.db_session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[UserModel]:
        stmt = select(UserModel).where(UserModel.email == email)
        result = await self.db_session.execute(stmt)
        return result.scalar_one_or_none()
    async def get_all(self, skip: int = 0, limit: int = 100) -> List[UserModel]:
        stmt = select(UserModel).offset(skip).limit(limit).order_by(UserModel.id)
        result = await self.db_session.execute(stmt)
        return result.scalars().all()

    async def get_user_by_role(self, role_id: int) -> List[UserModel]:
        stmt = (
            select(UserModel)
            .join(UserRoleModel)
            .where(UserRoleModel.role_id == role_id)
        )
        result = await self.db_session.execute(stmt)
        return result.scalars().all()

    async def save(self, user: UserModel) -> UserModel:
        self.db_session.add(user)
        return user

    async def create(self, user: UserModel) -> UserModel:
        """Tạo người dùng mới."""
        self.db_session.add(user)
        await self.db_session.flush()
        await self.db_session.refresh(user)
        return user

    async def update(self, user: UserModel) -> UserModel:
        """Cập nhật người dùng."""
        await self.db_session.flush()
        await self.db_session.refresh(user)
        return user

    async def delete(self, user_id: int) -> None:
        """Xóa người dùng."""
        user = await self.get_by_id(user_id)
        if user is None:
            raise NotFoundError(f"User with ID {user_id} not found.")
        await self.db_session.delete(user)
        await self.db_session.flush()