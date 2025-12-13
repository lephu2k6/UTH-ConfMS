from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Optional

from api.schemas.user_schema import (
    UserResponse,
    CreateUserRequest,
    UserUpdateRequest,
    UserRolesUpdateRequest,
    UserListResponse,
)
from services.user.create_user_service import CreateUserService
from services.user.list_users_service import ListUsersService
from services.user.get_user_service import GetUserService
from services.user.update_user_service import UpdateUserService
from services.user.delete_user_service import DeleteUserService
from services.user.update_user_roles_service import UpdateUserRolesService
from domain.exceptions import (
    UserNotFoundError,
    DuplicateUserError,
    InvalidUserOperationError,
)
from dependency_container import (
    get_create_user_service,
    get_list_users_service,
    get_get_user_service,
    get_update_user_service,
    get_delete_user_service,
    get_update_user_roles_service,
)

router = APIRouter(prefix="/users", tags=["User Management"])


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user_endpoint(
    request: CreateUserRequest,
    create_service: CreateUserService = Depends(get_create_user_service),
):
    """
    Tạo mới người dùng (CRUD - Create).
    """
    try:
        user = await create_service.create_user(
            full_name=request.full_name,
            email=request.email,
            password=request.password,
            affiliation=request.affiliation,
            phone_number=request.phone_number,
            website_url=request.website_url,
            role_ids=request.role_ids,
            is_active=request.is_active,
            is_verified=request.is_verified,
        )
        return UserResponse.model_validate(user)
    except DuplicateUserError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi tạo người dùng: {str(e)}",
        )


@router.get("", response_model=UserListResponse)
async def list_users_endpoint(
    skip: int = Query(0, ge=0, description="Số lượng bản ghi bỏ qua"),
    limit: int = Query(100, ge=1, le=1000, description="Số lượng bản ghi tối đa"),
    list_service: ListUsersService = Depends(get_list_users_service),
):
    """
    Lấy danh sách tất cả người dùng với phân trang (CRUD - Read).
    """
    try:
        users, total = await list_service.list_users(skip=skip, limit=limit)
        return UserListResponse(
            users=[UserResponse.model_validate(user) for user in users],
            total=total,
            skip=skip,
            limit=limit,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi lấy danh sách người dùng: {str(e)}",
        )


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_endpoint(
    user_id: int,
    get_service: GetUserService = Depends(get_get_user_service),
):
    """
    Lấy thông tin chi tiết của một người dùng theo ID (CRUD - Read).
    """
    try:
        user = await get_service.get_user_by_id(user_id)
        return UserResponse.model_validate(user)
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi lấy thông tin người dùng: {str(e)}",
        )


@router.put("/{user_id}", response_model=UserResponse)
async def update_user_endpoint(
    user_id: int,
    request: UserUpdateRequest,
    update_service: UpdateUserService = Depends(get_update_user_service),
):
    """
    Cập nhật thông tin của một người dùng (CRUD - Update).
    """
    try:
        user = await update_service.update_user(
            user_id=user_id,
            full_name=request.full_name,
            email=request.email,
            affiliation=request.affiliation,
            phone_number=request.phone_number,
            website_url=request.website_url,
        )
        return UserResponse.model_validate(user)
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except DuplicateUserError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi cập nhật người dùng: {str(e)}",
        )


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_endpoint(
    user_id: int,
    delete_service: DeleteUserService = Depends(get_delete_user_service),
):
    """
    Xóa một người dùng khỏi hệ thống (CRUD - Delete).
    """
    try:
        await delete_service.delete_user(user_id)
        return None
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi xóa người dùng: {str(e)}",
        )


@router.patch("/{user_id}/activate", response_model=UserResponse)
async def activate_user_endpoint(
    user_id: int,
    update_service: UpdateUserService = Depends(get_update_user_service),
):
    """
    Kích hoạt một người dùng.
    """
    try:
        user = await update_service.activate_user(user_id)
        return UserResponse.model_validate(user)
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi kích hoạt người dùng: {str(e)}",
        )


@router.patch("/{user_id}/deactivate", response_model=UserResponse)
async def deactivate_user_endpoint(
    user_id: int,
    update_service: UpdateUserService = Depends(get_update_user_service),
):
    """
    Vô hiệu hóa một người dùng.
    """
    try:
        user = await update_service.deactivate_user(user_id)
        return UserResponse.model_validate(user)
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi vô hiệu hóa người dùng: {str(e)}",
        )


@router.patch("/{user_id}/roles", response_model=UserResponse)
async def update_user_roles_endpoint(
    user_id: int,
    request: UserRolesUpdateRequest,
    update_roles_service: UpdateUserRolesService = Depends(get_update_user_roles_service),
):
    """
    Cập nhật vai trò của một người dùng.
    """
    try:
        user = await update_roles_service.update_user_roles(
            user_id=user_id, role_ids=request.role_ids
        )
        return UserResponse.model_validate(user)
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi cập nhật vai trò người dùng: {str(e)}",
        )

