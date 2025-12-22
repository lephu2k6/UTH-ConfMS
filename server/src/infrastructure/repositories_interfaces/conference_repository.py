from abc import ABC, abstractmethod
from typing import List, Optional
from domain.models.conference import Conference

class ConferenceRepository(ABC):

    @abstractmethod
    def create(self, conference: Conference) -> Conference:
        pass

    @abstractmethod
    def get_by_id(self, conference_id: int) -> Optional[Conference]:
        pass

    @abstractmethod
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Conference]:
        pass

    @abstractmethod
    def count_all(self) -> int:
        pass

