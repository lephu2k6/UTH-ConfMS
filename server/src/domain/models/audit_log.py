from typing import Optional, Dict, Any
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class ActionType(str, Enum):
    """Các loại hành động có thể được audit."""
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"
    LOGIN = "LOGIN"
    LOGOUT = "LOGOUT"
    VIEW = "VIEW"
    APPROVE = "APPROVE"
    REJECT = "REJECT"
    ASSIGN = "ASSIGN"
    SUBMIT = "SUBMIT"


class ResourceType(str, Enum):
    """Các loại tài nguyên có thể được audit."""
    USER = "USER"
    CONFERENCE = "CONFERENCE"
    SUBMISSION = "SUBMISSION"
    REVIEW = "REVIEW"
    ROLE = "ROLE"
    SYSTEM = "SYSTEM"


@dataclass
class AuditLog:
    """Domain model cho Audit Log."""
    action_type: ActionType
    resource_type: ResourceType
    user_id: int
    resource_id: Optional[int] = None
    id: Optional[int] = None
    description: Optional[str] = None
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = field(default_factory=dict)

    def __post_init__(self):
        """Khởi tạo giá trị mặc định."""
        if self.created_at is None:
            self.created_at = datetime.utcnow()
        if self.metadata is None:
            self.metadata = {}

