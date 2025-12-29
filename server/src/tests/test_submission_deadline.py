import pytest
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException

from services.submission.edit_submission import EditSubmissionService
from services.submission.delete_submission import DeleteSubmissionService


class FakeConference:
    def __init__(self, submission_deadline):
        self.submission_deadline = submission_deadline


class FakeTrack:
    def __init__(self, conference):
        self.conference = conference


class FakeSubmission:
    def __init__(self, track):
        self.track = track


class RepoAllow:
    def __init__(self, submission):
        self.submission = submission
        self.updated = False
        self.deleted = False

    def get_by_id(self, submission_id):
        return self.submission

    def update(self, submission_id, data):
        self.updated = True
        return {"id": submission_id, **data}

    def delete(self, submission_id):
        self.deleted = True
        return None


def test_edit_blocked_after_deadline():
    past = datetime.now(timezone.utc) - timedelta(days=1)
    conf = FakeConference(past)
    track = FakeTrack(conf)
    sub = FakeSubmission(track)
    repo = RepoAllow(sub)
    svc = EditSubmissionService(repo)
    with pytest.raises(HTTPException) as exc:
        svc.execute(1, {"title": "New"})
    assert exc.value.status_code == 403


def test_edit_allowed_before_deadline():
    future = datetime.now(timezone.utc) + timedelta(days=1)
    conf = FakeConference(future)
    track = FakeTrack(conf)
    sub = FakeSubmission(track)
    repo = RepoAllow(sub)
    svc = EditSubmissionService(repo)
    res = svc.execute(1, {"title": "New"})
    assert repo.updated is True
    assert res["title"] == "New"


def test_delete_blocked_after_deadline():
    past = datetime.now(timezone.utc) - timedelta(days=1)
    conf = FakeConference(past)
    track = FakeTrack(conf)
    sub = FakeSubmission(track)
    repo = RepoAllow(sub)
    svc = DeleteSubmissionService(repo)
    with pytest.raises(HTTPException) as exc:
        svc.execute(1)
    assert exc.value.status_code == 403


def test_delete_allowed_before_deadline():
    future = datetime.now(timezone.utc) + timedelta(days=1)
    conf = FakeConference(future)
    track = FakeTrack(conf)
    sub = FakeSubmission(track)
    repo = RepoAllow(sub)
    svc = DeleteSubmissionService(repo)
    res = svc.execute(1)
    assert repo.deleted is True
    assert res is True
