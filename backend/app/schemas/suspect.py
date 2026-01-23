from pydantic import BaseModel
from datetime import datetime


class SuspectBase(BaseModel):
    name: str
    alias: str | None = None


class SuspectCreate(SuspectBase):
    pass


class SuspectResponse(SuspectBase):
    id: int
    risk_level: str
    created_at: datetime

    class Config:
        from_attributes = True
