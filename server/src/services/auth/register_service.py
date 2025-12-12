
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.security.password_hash import Hasher
from infrastructure.models.user_model import UserModel, RoleModel
from domain.exceptions import DuplicateUserError


class RegisterService:
    DEFAULT_AUTHOR_ROLE_ID = 4
    REVIEWER_ROLE_ID = 3

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def _get_or_create_role(self, role_id: int, name: str) -> RoleModel:
        role = await self.db_session.get(RoleModel, role_id)
        if role is None:
            role = RoleModel(id=role_id, name=name)
            self.db_session.add(role)
            await self.db_session.flush()
        return role

    async def register_new_user(
        self, full_name: str, email: str, password: str, affiliation: str, is_reviewer: bool
    ) -> UserModel:
        if await self.user_repo.get_by_email(email):
            raise DuplicateUserError(f"Email '{email}' đã tồn tại.")

        hashed_password = Hasher.hash_password(password)

        new_user = UserModel(
            full_name=full_name,
            email=email,
            hashed_password=hashed_password,
            affiliation=affiliation,
            is_verified=False,
            is_active=True,
            created_at=datetime.utcnow(),
        )

        author_role = await self._get_or_create_role(self.DEFAULT_AUTHOR_ROLE_ID, "author")
        new_user.roles.append(author_role)

        if is_reviewer:
            reviewer_role = await self._get_or_create_role(self.REVIEWER_ROLE_ID, "reviewer")
            new_user.roles.append(reviewer_role)

        self.db_session.add(new_user)
        await self.db_session.commit()
        await self.db_session.refresh(new_user)

        return new_user