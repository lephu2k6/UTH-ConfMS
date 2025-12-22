from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ConferenceCreateRequest(BaseModel):
    name: str
    abbreviation: Optional[str] = None
    description: Optional[str] = None
    website_url: Optional[str] = None

    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    submission_deadline: Optional[datetime] = None
    review_deadline: Optional[datetime] = None

    is_open: bool = True
    double_blind: bool = True

class ConferenceResponse(BaseModel):
    id: int
    name: str
    abbreviation: Optional[str] = None
    description: Optional[str] = None
    website_url: Optional[str] = None

    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    submission_deadline: Optional[datetime] = None
    review_deadline: Optional[datetime] = None

    is_open: bool
    double_blind: bool

    class Config:
        from_attributes = True

class ConferenceListResponse(BaseModel):
    conferences: List[ConferenceResponse]
    total: int

