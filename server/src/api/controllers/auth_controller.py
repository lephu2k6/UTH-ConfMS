from fastapi import APIRouter, Depends, HTTPException, status

from api.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    UserResponse,
    ChairSetupRequest,
    RefreshTokenRequest,
    EmailVerificationRequest,
    MessageResponse,
    ResendVerificationRequest
)
from services.auth.login_service import LoginService
from services.auth.register_service import RegisterService
from services.auth.create_initial_chair import CreateInitialChairService
from services.auth.refresh_service import RefreshTokenService
from services.auth.email_verification_service import EmailVerificationService
from domain.exceptions import DuplicateUserError, AuthenticationError, InitialChairExistsError
from dependency_container import (
    get_login_service, 
    get_register_service, 
    get_create_chair_service,
    get_refresh_service,
    get_email_verification_service
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def register_user_endpoint(
    request: RegisterRequest,
    register_service: RegisterService = Depends(get_register_service),
):
    try:
        await register_service.register_new_user(
            full_name=request.full_name,
            email=request.email,
            password=request.password,    
        )
        return MessageResponse(
            message="Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
        )

    except DuplicateUserError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/login", response_model=TokenResponse)
async def login_for_access_token_endpoint(
    request: LoginRequest, login_service: LoginService = Depends(get_login_service)
):
    try:
        access_token, refresh_token = await login_service.authenticate_and_get_tokens( 
            email=request.email, 
            password=request.password
        )
        # trả về accesstoken và refreshtoken
        return TokenResponse(access_token=access_token, refresh_token=refresh_token) 
        
    except AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
@router.post("/refresh", response_model=TokenResponse)
async def refresh_token_endpoint(
    request: RefreshTokenRequest,
    refresh_service: RefreshTokenService = Depends(get_refresh_service)
):
    try:
        access_token, new_refresh_token = await refresh_service.refresh_access_token(
            refresh_token_plain=request.refresh_token
        )
        return TokenResponse(access_token=access_token, refresh_token=new_refresh_token)
    
    except AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )

@router.post("/verify-email", response_model=MessageResponse)
async def verify_email_endpoint(
    request: EmailVerificationRequest,
    verification_service: EmailVerificationService = Depends(get_email_verification_service),
):
    try:
        await verification_service.verify_email(request.token)
        return MessageResponse(message="Email đã được xác thực thành công!")
    except AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/resend-verification", response_model=MessageResponse)
async def resend_verification_endpoint(
    request: ResendVerificationRequest,
    verification_service: EmailVerificationService = Depends(get_email_verification_service),
):
    try:
        await verification_service.resend_verification_email(request.email)
        return MessageResponse(message="Email xác thực đã được gửi lại. Vui lòng kiểm tra hộp thư.")
    except AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/initial-chair-setup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_initial_chair_endpoint(
    request: ChairSetupRequest, chair_service: CreateInitialChairService = Depends(get_create_chair_service)
):
    try:
        new_chair = await chair_service.create_chair(
            full_name=request.full_name,
            email=request.email,
            password=request.password,
        )
        return UserResponse.model_validate(new_chair)

    except InitialChairExistsError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    except DuplicateUserError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

