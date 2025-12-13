from abc import ABC, abstractmethod
from typing import Optional, List, Tuple
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
    async def get_all(self, skip: int = 0, limit: int = 100) -> Tuple[List[UserModel], int]:
        """Lấy tất cả người dùng với phân trang. Trả về (danh sách, tổng số)."""
        pass

    @abstractmethod
    async def save(self, user: UserModel) -> UserModel:
        """Lưu hoặc cập nhật người dùng."""
        pass

    @abstractmethod
    async def delete(self, user: UserModel) -> None:
        """Xóa người dùng khỏi database."""
        pass