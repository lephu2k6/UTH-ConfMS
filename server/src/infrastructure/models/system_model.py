from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from infrastructure.databases.postgres import Base

class HistoryLogModel(Base):
    __tablename__ = "history_logs"

    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey("users.id"))
    action = Column(String)
    description = Column(String)
    ip_address = Column(String)
    actor_role = Column(String)
    created_at = Column(DateTime, default=func.now())
    
class NotificationLogModel(Base):
    __tablename__ = "notification_logs"

    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey("users.id"))
    message = Column(String)
    created_at = Column(DateTime, default=func.now())

class ScheduleItemModel(Base):
    __tablename__ = "schedule_items"

    id = Column(Integer, primary_key=True)
    conference_id = Column(ForeignKey("conferences.id"))
    submission_id = Column(ForeignKey("submissions.id"))
    lesson_id = Column(ForeignKey("lessons.id"))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    order_index = Column(Integer)

    lesson = relationship("LessonModel", back_populates="schedule_items")
    conference = relationship("ConferenceModel")
    submission = relationship("SubmissionModel")