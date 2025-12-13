from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class CreateUserRequest(BaseModel):
    """Schema để tạo mới người dùng."""
    full_name: str
    email: EmailStr
    password: str = Field(..., min_length=6, description="Mật khẩu tối thiểu 6 ký tự")
    affiliation: Optional[str] = None
    phone_number: Optional[str] = None
    website_url: Optional[str] = None
    role_ids: List[int] = Field(default=[4], description="Danh sách ID các vai trò (mặc định: author)")
    is_active: bool = Field(default=True, description="Trạng thái kích hoạt")
    is_verified: bool = Field(default=False, description="Trạng thái xác thực")


class UserUpdateRequest(BaseModel):
    """Schema để cập nhật thông tin người dùng."""
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    affiliation: Optional[str] = None
    phone_number: Optional[str] = None
    website_url: Optional[str] = None


class UserRolesUpdateRequest(BaseModel):
    """Schema để cập nhật vai trò của người dùng."""
    role_ids: List[int] = Field(..., description="Danh sách ID các vai trò")


class UserResponse(BaseModel):
    """Schema phản hồi thông tin người dùng."""
    id: int
    full_name: Optional[str] = None
    email: EmailStr
    affiliation: Optional[str] = None
    phone_number: Optional[str] = None
    website_url: Optional[str] = None
    is_verified: bool
    is_active: bool
    roles: List[str] = Field(default_factory=list, alias="role_names")
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class UserListResponse(BaseModel):
    """Schema phản hồi danh sách người dùng với phân trang."""
    users: List[UserResponse]
    total: int
    skip: int
    limit: int

