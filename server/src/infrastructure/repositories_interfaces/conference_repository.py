from abc import ABC, abstractmethod
from domain.models.conference import Conference

class ConferenceRepository(ABC):

    @abstractmethod
    def create(self, conference: Conference) -> Conference:
        pass

