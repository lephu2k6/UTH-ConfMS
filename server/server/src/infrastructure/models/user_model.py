from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Enum
from sqlalchemy.dialects.postgresql import JSONB
from src.infrastructure.databases.postgres import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "Admin"
    CHAIR = "Chair"
    REVIEWER = "Reviewer"
    AUTHOR = "Author"
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    

    full_name = Column(String, index=True)
    affiliation = Column(String)
    

    roles = Column(JSONB, default=[UserRole.AUTHOR.value]) 
    is_active = Column(Boolean, default=True)
    

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now()) 

    sso_id = Column(String, unique=True, nullable=True)