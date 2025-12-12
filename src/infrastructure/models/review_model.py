from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, Boolean, PrimaryKeyConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import NUMERIC
from src.infrastructure.databases.postgres import Base
from sqlalchemy.dialects.postgresql import JSONB

class ReviewAssignmentModel(Base):
    """Phân công bài cho Reviewer."""
    __tablename__ = "review_assignments"
    
    submission_id = Column(ForeignKey("submissions.id"), primary_key=True)
    reviewer_id = Column(ForeignKey("users.id"), primary_key=True)
    
    auto_assigned = Column(Boolean, default=False)
    # TBD: status (e.g., 'Pending', 'Submitted', 'Declined')
    
    # Relationships
    review = relationship("ReviewModel", back_populates="assignment", uselist=False)

class ReviewModel(Base):
    """Nội dung bài đánh giá."""
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(ForeignKey("submissions.id"), nullable=False)
    reviewer_id = Column(ForeignKey("users.id"), nullable=False)
    
    summary = Column(String)
    weakness = Column(String)
    best_paper_recommendation = Column(Boolean, default=False)
    
    # Liên kết với Assignment
    __table_args__ = (
        UniqueConstraint('submission_id', 'reviewer_id', name='uq_review_assignment'),
    )
    assignment = relationship("ReviewAssignmentModel", back_populates="review")
    answers = relationship("ReviewAnswerModel", back_populates="review")

class ReviewQuestionModel(Base):
    """Bộ câu hỏi đánh giá."""
    __tablename__ = "review_question"
    id = Column(Integer, primary_key=True)
    question = Column(String, nullable=False)
    type = Column(String) # e.g., 'Score', 'Text', 'Choice'
    required = Column(Boolean, default=True)

class ReviewAnswerModel(Base):
    """Câu trả lời cho các câu hỏi đánh giá."""
    __tablename__ = "review_answers"
    review_id = Column(ForeignKey("reviews.id"), primary_key=True)
    question_id = Column(ForeignKey("review_question.id"), primary_key=True)
    answer = Column(String) # Có thể là điểm số hoặc văn bản
    
    review = relationship("ReviewModel", back_populates="answers")
    question = relationship("ReviewQuestionModel")
    
class ConflictOfInterestModel(Base):
    """Ghi nhận COI giữa User và Submission."""
    __tablename__ = "conflicts_of_interest"
    submission_id = Column(ForeignKey("submissions.id"), primary_key=True)
    user_id = Column(ForeignKey("users.id"), primary_key=True)
    
    coi_type = Column(String) 
    detected_by_system = Column(Boolean, default=False)

class BiddingModel(Base):
    """Sở thích đánh giá của Reviewer."""
    __tablename__ = "bidding"
    submission_id = Column(ForeignKey("submissions.id"), primary_key=True)
    reviewer_id = Column(ForeignKey("users.id"), primary_key=True)
    
    bid = Column(String) # e.g., 'Yes', 'No', 'Maybe'
    
class ReviewerExpertiseModel(Base):
    """Chuyên môn (keywords) của Reviewer."""
    __tablename__ = "reviewer_expertise"
    user_id = Column(ForeignKey("users.id"), primary_key=True)
    keyword = Column(String, primary_key=True)