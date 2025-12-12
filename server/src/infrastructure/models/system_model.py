from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from src.infrastructure.databases.postgres import Base

class HistoryLogModel(Base):
    """Lịch sử hoạt động và Audit Trail."""
    __tablename__ = "history_logs"
    id = Column(Integer, primary_key=True, index=True)
    
    user_id = Column(ForeignKey("users.id")) 
    actor_role = Column(String)
    
    description = Column(String)
    details = Column(JSONB) # Chi tiết payload/context
    
    created_at = Column(DateTime, default=func.now())
    
class NotificationLogModel(Base):
    """Lịch sử các thông báo đã gửi."""
    __tablename__ = "notification_logs"
    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey("users.id"))
    submission_id = Column(ForeignKey("submissions.id"))
    
    type = Column(String) # e.g., 'Decision', 'Reminder'
    content = Column(String)
    is_sent = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=func.now())

class ScheduleItemModel(Base):
    """Lịch trình chi tiết của các bài trình bày."""
    __tablename__ = "schedule_items"
    id = Column(Integer, primary_key=True)
    conference_id = Column(ForeignKey("conferences.id"))
    submission_id = Column(ForeignKey("submissions.id"))
    lesson_id = Column(ForeignKey("lessons.id")) # Session
    
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    
    lesson = relationship("LessonModel", back_populates="schedule_items")
    submission = relationship("SubmissionModel")