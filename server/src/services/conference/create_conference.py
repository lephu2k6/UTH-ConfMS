from domain.models.conference import Conference
from domain.exceptions import BusinessRuleException
from infrastructure.repositories_interfaces.conference_repository import ConferenceRepository  # pyright: ignore[reportMissingImports]

class CreateConferenceService:

    def __init__(self, repo: ConferenceRepository):
        self.repo = repo

    def execute(self, conference: Conference) -> Conference:
        if conference.start_date and conference.end_date:
            if conference.end_date < conference.start_date:
                raise BusinessRuleException("end_date must be after start_date")

        if conference.submission_deadline and conference.start_date:
            if conference.submission_deadline > conference.start_date:
                raise BusinessRuleException("submission_deadline must be before start_date")

        return self.repo.create(conference)
