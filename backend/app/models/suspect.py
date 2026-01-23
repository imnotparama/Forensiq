from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Suspect(Base):
    __tablename__ = "suspects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    alias = Column(String, nullable=True)
    risk_level = Column(String, default="Low")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
