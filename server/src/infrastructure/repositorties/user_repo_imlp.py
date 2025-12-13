

from typing import Optional, List, Tuple
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
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

    async def get_all(self, skip: int = 0, limit: int = 100) -> Tuple[List[UserModel], int]:
        """Lấy tất cả người dùng với phân trang."""
        # Đếm tổng số users
        count_stmt = select(func.count()).select_from(UserModel)
        count_result = await self.db_session.execute(count_stmt)
        total = count_result.scalar_one()

        # Lấy danh sách users với phân trang
        stmt = select(UserModel).offset(skip).limit(limit).order_by(UserModel.id)
        result = await self.db_session.execute(stmt)
        users = result.scalars().all()
        
        return list(users), total

    async def save(self, user: UserModel) -> UserModel:
        self.db_session.add(user)
        return user

    async def delete(self, user: UserModel) -> None:
        """Xóa người dùng khỏi database."""
        self.db_session.delete(user)