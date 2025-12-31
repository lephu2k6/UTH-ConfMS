from pydantic import BaseModel
from typing import Optional


class SubmissionPatchSchema(BaseModel):
    title: Optional[str]
    abstract: Optional[str]
    status: Optional[str]

    class Config:
        orm_mode = True


class SubmissionResponseSchema(BaseModel):
    id: int
    title: str
    abstract: str
    status: Optional[str] = None

    class Config:
        orm_mode = True
