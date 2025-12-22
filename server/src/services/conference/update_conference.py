from infrastructure.repositories_interfaces.conference_repository import ConferenceRepository  # pyright: ignore[reportMissingImports]
from domain.models.conference import Conference
from domain.exceptions import NotFoundError

class UpdateConferenceService:

    def __init__(self, repo: ConferenceRepository):
        self.repo = repo

    def update(self, conference: Conference) -> Conference:
        """Update a conference and return the updated domain object.

        Raises NotFoundError if not found.
        """
        return self.repo.update(conference)
