from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import datetime
from infrastructure.models.audit_log_model import AuditLogModel
from domain.models.audit_log import ActionType, ResourceType


class AuditLogRepository(ABC):
    """Repository interface cho Audit Log."""

    @abstractmethod
    async def create(self, audit_log: AuditLogModel) -> AuditLogModel:
        """Tạo audit log mới."""
        pass

    @abstractmethod
    async def get_by_id(self, audit_log_id: int) -> Optional[AuditLogModel]:
        """Lấy audit log theo ID."""
        pass

    @abstractmethod
    async def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        user_id: Optional[int] = None,
        action_type: Optional[ActionType] = None,
        resource_type: Optional[ResourceType] = None,
        resource_id: Optional[int] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
    ) -> List[AuditLogModel]:
        """Lấy danh sách audit logs với các bộ lọc."""
        pass

    @abstractmethod
    async def count(
        self,
        user_id: Optional[int] = None,
        action_type: Optional[ActionType] = None,
        resource_type: Optional[ResourceType] = None,
        resource_id: Optional[int] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
    ) -> int:
        """Đếm số lượng audit logs với các bộ lọc."""
        pass

