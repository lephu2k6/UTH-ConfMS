from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.schemas.conference_schema import ConferenceCreateRequest  # pyright: ignore[reportMissingImports]
from domain.models.conference import Conference
from infrastructure.databases.postgres import get_db
from infrastructure.repositories.conference_repo_impl import ConferenceRepositoryImpl  # pyright: ignore[reportMissingImports]
from services.conference.create_conference import CreateConferenceService

router = APIRouter(prefix="/conferences", tags=["Conferences"])

@router.post("")
def create_conference(
    request: ConferenceCreateRequest,
    db: Session = Depends(get_db)
):
    repo = ConferenceRepositoryImpl(db)
    service = CreateConferenceService(repo)

    conference = Conference(
        id=None,
        name=request.name,
        abbreviation=request.abbreviation,
        description=request.description,
        website_url=request.website_url,
        start_date=request.start_date,
        end_date=request.end_date,
        submission_deadline=request.submission_deadline,
        review_deadline=request.review_deadline,
        is_open=request.is_open,
        double_blind=request.double_blind
    )

    result = service.execute(conference)

    return {
        "message": "Conference created successfully",
        "data": result
    }
