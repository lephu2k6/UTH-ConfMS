

from typing import Optional, List
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.models.user_model import UserModel, UserRoleModel 


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