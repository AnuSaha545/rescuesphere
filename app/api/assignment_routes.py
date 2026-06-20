from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.assignment import Assignment
from app.schemas.assignment_schema import AssignmentCreate

router = APIRouter()


@router.post("/assignments")
def create_assignment(
    assignment: AssignmentCreate,
    db: Session = Depends(get_db)
):

    new_assignment = Assignment(
        request_id=assignment.request_id,
        resource_id=assignment.resource_id
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return {
        "id": new_assignment.id,
        "request_id": new_assignment.request_id,
        "resource_id": new_assignment.resource_id
    }


@router.get("/assignments")
def get_assignments(
    db: Session = Depends(get_db)
):

    assignments = db.query(Assignment).all()

    return [
        {
            "id": assignment.id,
            "request_id": assignment.request_id,
            "resource_id": assignment.resource_id
        }
        for assignment in assignments
    ]