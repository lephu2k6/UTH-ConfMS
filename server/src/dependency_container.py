from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator

from infrastructure.databases.postgres import async_session
from infrastructure.repositorties.user_repo_imlp import UserRepositoryImpl
from infrastructure.repositories_interfaces.user_repository import UserRepository
from infrastructure.security.jwt import JWTService
from services.auth.login_service import LoginService
from services.auth.register_service import RegisterService
from services.auth.create_initial_chair import CreateInitialChairService
from services.auth.refresh_service import RefreshTokenService
from services.user.create_user_service import CreateUserService
from services.user.list_users_service import ListUsersService
from services.user.get_user_service import GetUserService
from services.user.update_user_service import UpdateUserService
from services.user.delete_user_service import DeleteUserService
from services.user.update_user_roles_service import UpdateUserRolesService


# 1. Hàm Factory cho Database Session
async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """Cung cấp AsyncSession cho mỗi request."""
    async with async_session() as session:
        yield session


# 2. Hàm Factory cho User Repository (Tầng Data Access)
def get_user_repo(db_session: AsyncSession = Depends(get_db_session)) -> UserRepository:
    """Cung cấp implementation của UserRepository."""
    return UserRepositoryImpl(db_session)


# 3. Hàm Factory cho JWT Service
def get_jwt_service() -> JWTService:
    """Cung cấp JWT Service."""
    return JWTService()


# 4. Hàm Factory cho Login Service
def get_login_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
    jwt_service: JWTService = Depends(get_jwt_service),
) -> LoginService:
    """Cung cấp Login Service."""
    return LoginService(user_repo, db_session, jwt_service)


# 5. Hàm Factory cho Register Service
def get_register_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> RegisterService:
    """Cung cấp Register Service."""
    return RegisterService(user_repo, db_session)


# 6. Hàm Factory cho Initial Chair Setup Service
def get_create_chair_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> CreateInitialChairService:
    """Cung cấp Create Initial Chair Service."""
    return CreateInitialChairService(user_repo, db_session)


# 7. Hàm Factory cho Refresh Token Service (ĐÃ SỬA LỖI CÚ PHÁP)
def get_refresh_service(
    db_session: AsyncSession = Depends(get_db_session), 
    user_repo: UserRepository = Depends(get_user_repo),
    jwt_service: JWTService = Depends(get_jwt_service)
) -> RefreshTokenService:
    """Cung cấp Refresh Token Service."""
    return RefreshTokenService(db_session, user_repo, jwt_service)


# 8. Hàm Factory cho Create User Service
def get_create_user_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> CreateUserService:
    """Cung cấp Create User Service."""
    return CreateUserService(user_repo, db_session)


# 9. Hàm Factory cho List Users Service
def get_list_users_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> ListUsersService:
    """Cung cấp List Users Service."""
    return ListUsersService(user_repo, db_session)


# 10. Hàm Factory cho Get User Service
def get_get_user_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> GetUserService:
    """Cung cấp Get User Service."""
    return GetUserService(user_repo, db_session)


# 11. Hàm Factory cho Update User Service
def get_update_user_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> UpdateUserService:
    """Cung cấp Update User Service."""
    return UpdateUserService(user_repo, db_session)


# 12. Hàm Factory cho Delete User Service
def get_delete_user_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> DeleteUserService:
    """Cung cấp Delete User Service."""
    return DeleteUserService(user_repo, db_session)


# 13. Hàm Factory cho Update User Roles Service
def get_update_user_roles_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> UpdateUserRolesService:
    """Cung cấp Update User Roles Service."""
    return UpdateUserRolesService(user_repo, db_session)

