from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.request_schema import RequestCreate
from app.schemas.status_schema import StatusUpdate

from app.database.dependencies import get_db

from app.models.request import EmergencyRequest

from app.services.classifier import classify_request

router = APIRouter()


@router.post("/requests")
def create_request(
    request: RequestCreate,
    db: Session = Depends(get_db)
):
    classification = classify_request(request.message)

    new_request = EmergencyRequest(
        message=request.message,
        latitude=request.latitude,
        longitude=request.longitude,
        category=classification["category"],
        priority=classification["priority"]
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return {
        "id": new_request.id,
        "message": new_request.message,
        "category": new_request.category,
        "priority": new_request.priority,
        "status": "saved"
    }


@router.get("/requests")
def get_requests(db: Session = Depends(get_db)):
    requests = db.query(EmergencyRequest).all()

    return [
        {
            "id": req.id,
            "message": req.message,
            "latitude": req.latitude,
            "longitude": req.longitude,
            "category": req.category,
            "priority": req.priority,
            "status": req.status,
            "created_at": req.created_at
        }
        for req in requests
    ]


@router.patch("/requests/{request_id}/status")
def update_status(
    request_id: int,
    status_update: StatusUpdate,
    db: Session = Depends(get_db)
):
    request = (
        db.query(EmergencyRequest)
        .filter(EmergencyRequest.id == request_id)
        .first()
    )

    if not request:
        return {
            "error": "Request not found"
        }

    request.status = status_update.status

    db.commit()
    db.refresh(request)

    return {
        "id": request.id,
        "message": request.message,
        "status": request.status
    }