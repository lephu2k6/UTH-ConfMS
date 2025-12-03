from app.db.session import Base, engine
from app.models import db_models

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
