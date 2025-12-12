from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, ForeignKey, Table
from sqlalchemy.orm import relationship, Mapped, mapped_column
from src.infrastructure.databases.postgres import Base
from sqlalchemy.dialects.postgresql import JSONB
import enum

class RoleModel(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
class UserRoleModel(Base):
    __tablename__ = "user_roles"
    user_id = Column(ForeignKey("users.id"), primary_key=True)
    role_id = Column(ForeignKey("roles.id"), primary_key=True)
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    affiliation = Column(String)
    phone_number = Column(String)
    website_url = Column(String)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    roles = relationship("RoleModel", secondary="user_roles", backref="users", lazy="selectin")