from sqlalchemy.orm import Session
from domain.models.conference import Conference
from infrastructure.models.conference_model import ConferenceModel
from infrastructure.repositories_interfaces.conference_repository import ConferenceRepository  # pyright: ignore[reportMissingImports]

class ConferenceRepositoryImpl(ConferenceRepository):

    def __init__(self, db: Session):
        self.db = db

    def create(self, conference: Conference) -> Conference:
        model = ConferenceModel(
            name=conference.name,
            abbreviation=conference.abbreviation,
            description=conference.description,
            website_url=conference.website_url,
            start_date=conference.start_date,
            end_date=conference.end_date,
            submission_deadline=conference.submission_deadline,
            review_deadline=conference.review_deadline,
            is_open=conference.is_open,
            double_blind=conference.double_blind
        )

        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)

        return Conference(
            id=model.id,
            name=model.name,
            abbreviation=model.abbreviation,
            description=model.description,
            website_url=model.website_url,
            start_date=model.start_date,
            end_date=model.end_date,
            submission_deadline=model.submission_deadline,
            review_deadline=model.review_deadline,
            is_open=model.is_open,
            double_blind=model.double_blind
        )
