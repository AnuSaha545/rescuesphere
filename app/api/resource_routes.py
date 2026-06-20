from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.resource import Resource
from app.schemas.resource_schema import ResourceCreate

router = APIRouter()


@router.post("/resources")
def create_resource(
    resource: ResourceCreate,
    db: Session = Depends(get_db)
):

    new_resource = Resource(
        name=resource.name,
        resource_type=resource.resource_type
    )

    db.add(new_resource)
    db.commit()
    db.refresh(new_resource)

    return {
        "id": new_resource.id,
        "name": new_resource.name,
        "resource_type": new_resource.resource_type,
        "status": new_resource.status
    }


@router.get("/resources")
def get_resources(db: Session = Depends(get_db)):

    resources = db.query(Resource).all()

    return [
        {
            "id": resource.id,
            "name": resource.name,
            "resource_type": resource.resource_type,
            "status": resource.status
        }
        for resource in resources
    ]