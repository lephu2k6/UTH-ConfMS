from abc import ABC, abstractmethod


class IUserRepository(ABC):
    @abstractmethod
    def create_user(
        self,
        email: str,
        hashed_password: str,
        full_name: str,
        affiliation: str = None,
        phone_number: str = None,
        website_url: str = None,
        roles: list = None,
    ):
        pass

    @abstractmethod
    def get_by_email(self, email: str):
        pass

    @abstractmethod
    def get_by_id(self, user_id: int):
        pass

    @abstractmethod
    def list_users(self):
        pass

    @abstractmethod
    def update_user(self, user_id: int, data: dict):
        pass

    @abstractmethod
    def delete_user(self, user_id: int):
        pass

