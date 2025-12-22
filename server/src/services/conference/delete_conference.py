from infrastructure.repositories_interfaces.conference_repository import ConferenceRepository  # pyright: ignore[reportMissingImports]
from domain.exceptions import NotFoundError

class DeleteConferenceService:

    def __init__(self, repo: ConferenceRepository):
        self.repo = repo

    def delete(self, conference_id: int) -> None:
        """Delete a conference by ID.

        Raises NotFoundError if not found.
        """
        self.repo.delete(conference_id)
