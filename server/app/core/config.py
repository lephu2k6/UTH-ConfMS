from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",  # file .env nằm cùng cấp với folder server/
        env_file_encoding="utf-8"
    )
    DATABASE_URL: str

settings = Settings()
