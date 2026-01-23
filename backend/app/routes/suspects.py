from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal, engine
from app.db.database import Base
from app.models.suspect import Suspect
from app.schemas.suspect import SuspectCreate, SuspectResponse

router = APIRouter(
    prefix="/suspects",
    tags=["Suspects"]
)

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=SuspectResponse)
def create_suspect(
    suspect: SuspectCreate,
    db: Session = Depends(get_db)
):
    db_suspect = Suspect(
        name=suspect.name,
        alias=suspect.alias
    )
    db.add(db_suspect)
    db.commit()
    db.refresh(db_suspect)
    return db_suspect


@router.get("/", response_model=list[SuspectResponse])
def list_suspects(db: Session = Depends(get_db)):
    return db.query(Suspect).all()


@router.get("/{suspect_id}", response_model=SuspectResponse)
def get_suspect(suspect_id: int, db: Session = Depends(get_db)):
    suspect = db.query(Suspect).filter(Suspect.id == suspect_id).first()
    if not suspect:
        raise HTTPException(status_code=404, detail="Suspect not found")
    return suspect
