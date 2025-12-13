from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.security.password_hash import Hasher
from infrastructure.models.user_model import UserModel, RoleModel
from domain.exceptions import DuplicateUserError


class CreateUserService:
    """Service để tạo mới người dùng (dành cho admin quản lý)."""

    def __init__(self, user_repo: UserRepository, db_session: AsyncSession):
        self.user_repo = user_repo
        self.db_session = db_session

    async def _get_or_create_role(self, role_id: int, name: str) -> RoleModel:
        """Lấy hoặc tạo role nếu chưa tồn tại."""
        role = await self.db_session.get(RoleModel, role_id)
        if role is None:
            role = RoleModel(id=role_id, name=name)
            self.db_session.add(role)
            await self.db_session.flush()
        return role

    async def create_user(
        self,
        full_name: str,
        email: str,
        password: str,
        affiliation: Optional[str] = None,
        phone_number: Optional[str] = None,
        website_url: Optional[str] = None,
        role_ids: List[int] = None,
        is_active: bool = True,
        is_verified: bool = False,
    ) -> UserModel:
        """
        Tạo mới người dùng.
        
        Args:
            full_name: Tên đầy đủ
            email: Email (phải unique)
            password: Mật khẩu (sẽ được hash)
            affiliation: Tổ chức/đơn vị
            phone_number: Số điện thoại
            website_url: URL website
            role_ids: Danh sách ID các vai trò (mặc định: [4] - author)
            is_active: Trạng thái kích hoạt
            is_verified: Trạng thái xác thực
            
        Returns:
            UserModel đã được tạo
            
        Raises:
            DuplicateUserError: Nếu email đã tồn tại
        """
        if role_ids is None:
            role_ids = [4]  # Mặc định là author

        # Kiểm tra email trùng lặp
        if await self.user_repo.get_by_email(email):
            raise DuplicateUserError(f"Email '{email}' đã tồn tại.")

        # Hash password
        hashed_password = Hasher.hash_password(password)

        # Tạo user mới
        new_user = UserModel(
            full_name=full_name,
            email=email,
            hashed_password=hashed_password,
            affiliation=affiliation,
            phone_number=phone_number,
            website_url=website_url,
            is_verified=is_verified,
            is_active=is_active,
            created_at=datetime.utcnow(),
        )

        # Gán roles
        role_name_map = {
            1: "admin",
            2: "chair",
            3: "reviewer",
            4: "author",
        }
        
        for role_id in role_ids:
            role_name = role_name_map.get(role_id, f"role_{role_id}")
            role = await self._get_or_create_role(role_id, role_name)
            new_user.roles.append(role)

        # Lưu vào database
        await self.user_repo.save(new_user)
        await self.db_session.commit()
        await self.db_session.refresh(new_user)

        return new_user

