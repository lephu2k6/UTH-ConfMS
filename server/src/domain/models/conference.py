from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Conference:
    id: Optional[int]
    name: str
    abbreviation: Optional[str]
    description: Optional[str]
    website_url: Optional[str]

    start_date: Optional[datetime]
    end_date: Optional[datetime]
    submission_deadline: Optional[datetime]
    review_deadline: Optional[datetime]

    is_open: bool
    double_blind: bool
