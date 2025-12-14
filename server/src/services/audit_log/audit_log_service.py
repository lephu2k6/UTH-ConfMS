from typing import List, Optional, Dict, Any
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories_interfaces.audit_log_repository import AuditLogRepository
from infrastructure.models.audit_log_model import AuditLogModel
from domain.models.audit_log import AuditLog, ActionType, ResourceType
from domain.exceptions import NotFoundError


class AuditLogService:
    """Service cho Audit Log."""

    def __init__(self, audit_log_repo: AuditLogRepository, db_session: AsyncSession):
        self.audit_log_repo = audit_log_repo
        self.db_session = db_session

    async def create_audit_log(
        self,
        action_type: ActionType,
        resource_type: ResourceType,
        user_id: int,
        resource_id: Optional[int] = None,
        description: Optional[str] = None,
        old_values: Optional[Dict[str, Any]] = None,
        new_values: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> AuditLogModel:
        """Tạo audit log mới."""
        audit_log = AuditLogModel(
            action_type=action_type.value,
            resource_type=resource_type.value,
            resource_id=resource_id,
            user_id=user_id,
            description=description,
            old_values=old_values,
            new_values=new_values,
            ip_address=ip_address,
            user_agent=user_agent,
            extra_metadata=metadata or {},
            created_at=datetime.utcnow(),
        )

        created_log = await self.audit_log_repo.create(audit_log)
        await self.db_session.commit()
        await self.db_session.refresh(created_log)
        return created_log

    async def get_audit_log_by_id(self, audit_log_id: int) -> AuditLogModel:
        """Lấy audit log theo ID."""
        audit_log = await self.audit_log_repo.get_by_id(audit_log_id)
        if audit_log is None:
            raise NotFoundError(f"Audit log với ID {audit_log_id} không tồn tại.")
        return audit_log

    async def get_audit_logs(
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
        return await self.audit_log_repo.get_all(
            skip=skip,
            limit=limit,
            user_id=user_id,
            action_type=action_type,
            resource_type=resource_type,
            resource_id=resource_id,
            start_date=start_date,
            end_date=end_date,
        )

    async def count_audit_logs(
        self,
        user_id: Optional[int] = None,
        action_type: Optional[ActionType] = None,
        resource_type: Optional[ResourceType] = None,
        resource_id: Optional[int] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
    ) -> int:
        """Đếm số lượng audit logs với các bộ lọc."""
        return await self.audit_log_repo.count(
            user_id=user_id,
            action_type=action_type,
            resource_type=resource_type,
            resource_id=resource_id,
            start_date=start_date,
            end_date=end_date,
        )

