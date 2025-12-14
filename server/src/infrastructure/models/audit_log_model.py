from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from infrastructure.databases.postgres import Base
import enum


class ActionTypeEnum(str, enum.Enum):
    """Enum cho loại hành động."""
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


class ResourceTypeEnum(str, enum.Enum):
    """Enum cho loại tài nguyên."""
    USER = "USER"
    CONFERENCE = "CONFERENCE"
    SUBMISSION = "SUBMISSION"
    REVIEW = "REVIEW"
    ROLE = "ROLE"
    SYSTEM = "SYSTEM"


class AuditLogModel(Base):
    """Database model cho Audit Log."""
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    action_type = Column(String(50), nullable=False, index=True)
    resource_type = Column(String(50), nullable=False, index=True)
    resource_id = Column(Integer, nullable=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    description = Column(Text, nullable=True)
    old_values = Column(JSONB, nullable=True)
    new_values = Column(JSONB, nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    extra_metadata = Column(JSONB, nullable=True, default={})
    created_at = Column(DateTime, default=func.now(), nullable=False, index=True)

    # Relationship với User
    user = relationship("UserModel", lazy="selectin")

    def to_domain_model(self):
        """Chuyển đổi từ database model sang domain model."""
        from domain.models.audit_log import AuditLog, ActionType, ResourceType
        
        return AuditLog(
            id=self.id,
            action_type=ActionType(self.action_type),
            resource_type=ResourceType(self.resource_type),
            resource_id=self.resource_id,
            user_id=self.user_id,
            description=self.description,
            old_values=self.old_values,
            new_values=self.new_values,
            ip_address=self.ip_address,
            user_agent=self.user_agent,
            metadata=self.extra_metadata or {},
            created_at=self.created_at,
        )

