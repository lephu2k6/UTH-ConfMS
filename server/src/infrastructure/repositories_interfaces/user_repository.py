from abc import ABC, abstractmethod
from typing import Optional, List
from infrastructure.models.user_model import UserModel

class UserRepository(ABC):
    @abstractmethod
    async def get_by_id(self, user_id: int) -> Optional[UserModel]:
        pass

    @abstractmethod
    async def get_by_email(self, email: str) -> Optional[UserModel]:
        pass

    @abstractmethod
    async def get_user_by_role(self, role_id: int) -> List[UserModel]:
        """Tìm tất cả người dùng có vai trò cụ thể."""
        pass

    @abstractmethod
    async def save(self, user: UserModel) -> UserModel:
        """Lưu hoặc cập nhật người dùng."""
        pass