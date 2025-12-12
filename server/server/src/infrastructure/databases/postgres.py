from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from config import settings

# Tạo async engine
engine = create_async_engine(settings.DATABASE_URL, echo=True)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False 
)

# Hàm test connection
async def test_connection():
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("Kết nối csdl thành công!!! :))", result.scalar())
    except Exception as e:
        print("Kết nối csdl thất bại :((", e)
