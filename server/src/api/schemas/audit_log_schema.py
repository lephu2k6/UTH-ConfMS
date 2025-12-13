from typing import Optional, Dict, Any, List
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from domain.models.audit_log import ActionType, ResourceType


class AuditLogCreateRequest(BaseModel):
    """Schema cho request tạo audit log."""
    action_type: ActionType
    resource_type: ResourceType
    resource_id: Optional[int] = None
    description: Optional[str] = None
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None


class AuditLogResponse(BaseModel):
    """Schema cho response audit log."""
    id: int
    action_type: str
    resource_type: str
    resource_id: Optional[int] = None
    user_id: int
    user_email: Optional[str] = None
    user_full_name: Optional[str] = None
    description: Optional[str] = None
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AuditLogListResponse(BaseModel):
    """Schema cho response danh sách audit logs."""
    audit_logs: List[AuditLogResponse]
    total: int
    skip: int
    limit: int


class AuditLogFilterParams(BaseModel):
    """Schema cho các tham số lọc audit logs."""
    user_id: Optional[int] = Field(None, description="Lọc theo user ID")
    action_type: Optional[ActionType] = Field(None, description="Lọc theo loại hành động")
    resource_type: Optional[ResourceType] = Field(None, description="Lọc theo loại tài nguyên")
    resource_id: Optional[int] = Field(None, description="Lọc theo resource ID")
    start_date: Optional[datetime] = Field(None, description="Lọc từ ngày")
    end_date: Optional[datetime] = Field(None, description="Lọc đến ngày")

