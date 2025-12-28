from fastapi import APIRouter, Depends
from typing import List

from api.schemas.submission_schema import (
    SubmissionPatchSchema,
    SubmissionResponseSchema
)

from dependency_container import get_submission_repo
from services.submission.get_submission import GetSubmissionService
from services.submission.list_submissions import ListSubmissionsService
from services.submission.edit_submission import EditSubmissionService
from services.submission.delete_submission import DeleteSubmissionService


router = APIRouter(prefix="/submissions", tags=["Submissions"])


@router.get("/", response_model=List[SubmissionResponseSchema])
def list_submissions(repo=Depends(get_submission_repo)):
    return ListSubmissionsService(repo).execute()


@router.get("/{submission_id}", response_model=SubmissionResponseSchema)
def get_submission(submission_id: int, repo=Depends(get_submission_repo)):
    return GetSubmissionService(repo).execute(submission_id)


@router.patch("/{submission_id}", response_model=SubmissionResponseSchema)
def update_submission(
    submission_id: int,
    payload: SubmissionPatchSchema,
    repo=Depends(get_submission_repo)
):
    data = payload.dict(exclude_none=True)
    return EditSubmissionService(repo).execute(submission_id, data)


@router.delete("/{submission_id}")
def delete_submission(submission_id: int, repo=Depends(get_submission_repo)):
    DeleteSubmissionService(repo).execute(submission_id)
    return {"message": "Submission deleted successfully"}
