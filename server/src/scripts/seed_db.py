import asyncio
from datetime import datetime
from sqlalchemy import select
from infrastructure.databases.postgres import async_session
from infrastructure.models.user_model import UserModel, RoleModel
from infrastructure.models.conference_model import ConferenceModel, TrackModel
from infrastructure.models.submission_model import SubmissionModel, SubmissionFileModel, SubmissionAuthorModel
from infrastructure.security.password_hash import Hasher


async def get_or_create_role(session, name, role_id=None):
    q = await session.execute(select(RoleModel).where(RoleModel.name == name))
    role = q.scalars().first()
    if role:
        return role
    role = RoleModel(id=role_id, name=name) if role_id else RoleModel(name=name)
    session.add(role)
    await session.flush()
    return role


async def get_or_create_user(session, email, password, full_name=None, role_names=None):
    q = await session.execute(select(UserModel).where(UserModel.email == email))
    user = q.scalars().first()
    if user:
        return user
    hashed = Hasher.hash_password(password)
    user = UserModel(
        email=email,
        hashed_password=hashed,
        password_hash=hashed,
        full_name=full_name,
        is_verified=True,
        is_active=True,
        created_at=datetime.utcnow(),
    )
    session.add(user)
    await session.flush()
    # attach roles
    if role_names:
        for rname in role_names:
            rq = await session.execute(select(RoleModel).where(RoleModel.name == rname))
            role = rq.scalars().first()
            if role:
                user.roles.append(role)
    await session.flush()
    return user


async def main():
    async with async_session() as session:
        async with session.begin():
            # Roles
            admin_role = await get_or_create_role(session, "admin", role_id=1)
            chair_role = await get_or_create_role(session, "chair", role_id=2)
            reviewer_role = await get_or_create_role(session, "reviewer", role_id=3)
            author_role = await get_or_create_role(session, "author", role_id=4)

            # Users
            admin = await get_or_create_user(session, "admin@example.com", "adminpass", full_name="Admin User", role_names=["admin"])
            chair = await get_or_create_user(session, "chair@example.com", "chairpass", full_name="Conference Chair", role_names=["chair", "admin"])
            author = await get_or_create_user(session, "author@example.com", "authorpass", full_name="Author One", role_names=["author"])
            reviewer = await get_or_create_user(session, "reviewer@example.com", "reviewerpass", full_name="Reviewer One", role_names=["reviewer"])

            # Conference & Track
            conf_q = await session.execute(select(ConferenceModel).where(ConferenceModel.name == "TestConf 2026"))
            conf = conf_q.scalars().first()
            if not conf:
                conf = ConferenceModel(
                    name="TestConf 2026",
                    abbreviation="TC2026",
                    description="A test conference",
                    website_url="https://example.org",
                    start_date=datetime(2026, 6, 1),
                    end_date=datetime(2026, 6, 3),
                    submission_deadline=datetime(2026, 3, 1),
                    review_deadline=datetime(2026, 4, 1),
                    is_open=True,
                    double_blind=True,
                )
                session.add(conf)
                await session.flush()

            # Track
            track_q = await session.execute(select(TrackModel).where(TrackModel.name == "Main Track", TrackModel.conference_id == conf.id))
            track = track_q.scalars().first()
            if not track:
                track = TrackModel(conference_id=conf.id, name="Main Track", max_reviewers=3)
                session.add(track)
                await session.flush()

            # Submission
            sub_q = await session.execute(select(SubmissionModel).where(SubmissionModel.title == "Test Paper by Author One"))
            submission = sub_q.scalars().first()
            if not submission:
                submission = SubmissionModel(
                    track_id=track.id,
                    title="Test Paper by Author One",
                    abstract="An abstract for testing",
                    status="submitted",
                    is_withdrawn=False,
                    avg_score=None,
                )
                session.add(submission)
                await session.flush()

    
                file = SubmissionFileModel(submission_id=submission.id, file_path="/tmp/testpaper.pdf", mime_type="application/pdf", version=1)
                session.add(file)
                await session.flush()


                submission.camera_ready_submission = file.id
                auth_link = SubmissionAuthorModel(submission_id=submission.id, user_id=author.id, order_index=1, is_corresponding=True, country="VN")
                session.add(auth_link)

            print("Seeding complete. Users:", [u.email for u in [admin, chair, author, reviewer]])

if __name__ == "__main__":
    asyncio.run(main())
