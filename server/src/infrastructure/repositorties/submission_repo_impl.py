from sqlalchemy.orm import Session
from fastapi import HTTPException

from infrastructure.models.submission_model import SubmissionModel, SubmissionAuthorModel
from infrastructure.repositories_interfaces.submission_repository import SubmissionRepository


class SubmissionRepositoryImpl(SubmissionRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, submission_id: int):
        submission = self.db.query(SubmissionModel).filter(
            SubmissionModel.id == submission_id
        ).first()

        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")

        return submission

    def get_all(self):
        return self.db.query(SubmissionModel).all()

    def get_by_author(self, user_id: int):
        # Join with submission_authors to find submissions where the user is an author
        return (
            self.db.query(SubmissionModel)
            .join(SubmissionAuthorModel, SubmissionModel.id == SubmissionAuthorModel.submission_id)
            .filter(SubmissionAuthorModel.user_id == user_id)
            .all()
        )

    def update(self, submission_id: int, data: dict):
        submission = self.get_by_id(submission_id)

        for k, v in data.items():
            setattr(submission, k, v)

        self.db.commit()
        self.db.refresh(submission)

        return submission

    def delete(self, submission_id: int):
        submission = self.get_by_id(submission_id)

        self.db.delete(submission)
        self.db.commit()
