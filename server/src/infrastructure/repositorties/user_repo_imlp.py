from sqlalchemy.orm import Session
from infrastructure.repositories_interfaces.user_repository import IUserRepository
from infrastructure.models.user_model import UserModel, RoleModel

class UserRepository(IUserRepository):

    def __init__(self, db: Session):
        self.db = db

    def create_user(self, email, hashed_password, full_name,
                    affiliation=None, phone_number=None,
                    website_url=None, roles=None):

        user = UserModel(
            email=email,
            hashed_password=hashed_password,
            full_name=full_name,
            affiliation=affiliation,
            phone_number=phone_number,
            website_url=website_url
        )

        # Gán roles nếu có
        if roles:
            role_objs = self.db.query(RoleModel).filter(RoleModel.name.in_(roles)).all()
            user.roles = role_objs

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user # pyright: ignore[reportReturnNone]jkejtejejoejogeojgojeojgejo

    def get_by_email(self, email):
        return self.db.query(UserModel).filter(UserModel.email == email).first()

    def get_by_id(self, user_id: int):
        return self.db.query(UserModel).filter(UserModel.id == user_id).first()

    def list_users(self):
        return self.db.query(UserModel).all()

    def update_user(self, user_id: int, data: dict):
        self.db.query(UserModel).filter(UserModel.id == user_id).update(data)
        self.db.commit()
        return self.get_by_id(user_id)

    def delete_user(self, user_id: int):
        user = self.get_by_id(user_id)
        if user:
            self.db.delete(user)
            self.db.commit()
        return True
