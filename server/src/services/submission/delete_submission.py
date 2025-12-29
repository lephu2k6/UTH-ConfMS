from datetime import datetime, timezone
from fastapi import HTTPException, status


class DeleteSubmissionService:
    def __init__(self, repo):
        self.repo = repo

    def execute(self, submission_id: int):
        submission = self.repo.get_by_id(submission_id)

        deadline = None
        if getattr(submission, "track", None) and getattr(submission.track, "conference", None):
            deadline = submission.track.conference.submission_deadline

        if deadline and datetime.now(timezone.utc) > deadline:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Submission deadline has passed; deletion is not allowed"
            )

        self.repo.delete(submission_id)
        return True
