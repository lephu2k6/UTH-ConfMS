import asyncio
from datetime import datetime, date, timedelta
from typing import List

from infrastructure.databases.postgres import SessionLocal
from infrastructure.email.email_service import EmailService
from infrastructure.models.conference_model import ConferenceModel
from infrastructure.models.user_model import UserModel
from infrastructure.models.submission_model import SubmissionAuthorModel, SubmissionModel



class DeadlineManager:
    """Background service to manage conference submission deadlines.

    Behavior:
    - For conferences with a submission_deadline set, send reminder emails
      at 3, 2, and 1 days before the deadline (once per day).
    - After deadline passes, send overdue notification to users who
      have NOT submitted any submission for that conference.

    This implementation runs in a loop and checks once every 24 hours.
    """

    def __init__(self, check_interval_seconds: int = 24 * 60 * 60):
        self.check_interval = check_interval_seconds
        self.email_service = EmailService()

    def _get_all_active_user_emails(self, db: Session) -> List[str]: # type: ignore
        users = db.query(UserModel).filter(UserModel.is_active == True).all()
        return [u.email for u in users if u.email]

    def _get_non_submitter_emails_for_conference(self, db: Session, conference: ConferenceModel) -> List[str]: # type: ignore
        # Find all user ids who have submitted in this conference
        submitted_user_ids = set()
        for track in conference.tracks:
            for submission in track.submissions:
                for author in submission.authors:
                    submitted_user_ids.add(author.user_id)

        users = db.query(UserModel).filter(UserModel.is_active == True).all()
        return [u.email for u in users if u.email and u.id not in submitted_user_ids]

    async def run_once(self):
        """Run a single check pass over conferences and send emails."""
        now = datetime.utcnow()
        today = now.date()

        db = SessionLocal()
        try:
            conferences = db.query(ConferenceModel).filter(ConferenceModel.submission_deadline != None).all()

            for conf in conferences:
                deadline = conf.submission_deadline
                if not deadline:
                    continue
                days_left = (deadline.date() - today).days

                # Reminders 3,2,1 days before
                if days_left in (3, 2, 1):
                    recipients = self._get_all_active_user_emails(db)
                    subject = f"Reminder: submission deadline for {conf.name} in {days_left} day(s)"
                    content = (
                        f"<p>The submission deadline for <b>{conf.name}</b> is on <b>{deadline.strftime('%Y-%m-%d')}</b> (in {days_left} day(s)).</p>"
                        f"<p>Please submit your paper before the deadline.</p>"
                        f"<p><a href=\"{self.email_service.frontend_url}\">Go to submission page</a></p>"
                    )
                    for email in recipients:
                        await self.email_service.send_notification(email, subject, content)

                # Overdue notifications to users who have not submitted
                if days_left < 0:
                    recipients = self._get_non_submitter_emails_for_conference(db, conf)
                    subject = f"Submission deadline passed for {conf.name}"
                    content = (
                        f"<p>The submission deadline for <b>{conf.name}</b> was on <b>{deadline.strftime('%Y-%m-%d')}</b>.</p>"
                        f"<p>If you did not submit a paper, your opportunity to submit has expired.</p>"
                        f"<p>This is an automated notice: bạn đã bị quá hạn.</p>"
                    )
                    for email in recipients:
                        await self.email_service.send_notification(email, subject, content)

        finally:
            db.close()

    async def run(self):
        """Run the deadline manager continuously."""
        while True:
            try:
                await self.run_once()
            except Exception:
                # Avoid crashing the loop; log could be added
                pass
            await asyncio.sleep(self.check_interval)


async def start_deadline_manager_in_background():
    manager = DeadlineManager()
    # fire-and-forget
    asyncio.create_task(manager.run())
