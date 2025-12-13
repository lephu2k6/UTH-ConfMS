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
from services.user.user_management_service import UserManagementService


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


# 8. Hàm Factory cho User Management Service
def get_user_management_service(
    user_repo: UserRepository = Depends(get_user_repo),
    db_session: AsyncSession = Depends(get_db_session),
) -> UserManagementService:
    """Cung cấp User Management Service."""
    return UserManagementService(user_repo, db_session)

