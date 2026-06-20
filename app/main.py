from fastapi import FastAPI

from app.api.request_routes import router as request_router
from app.api.dashboard_routes import router as dashboard_router
from app.api.resource_routes import router as resource_router
from app.api.assignment_routes import router as assignment_router

from app.database.database import engine
from app.database.base import Base

from app.models.request import EmergencyRequest
from app.models.resource import Resource
from app.models.assignment import Assignment

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RescueSphere",
    description="AI-Powered Local-First Disaster Relief Coordination Platform",
    version="1.0.0"
)

# Register API routes
app.include_router(request_router)
app.include_router(dashboard_router)
app.include_router(resource_router)
app.include_router(assignment_router)


@app.get("/")
def root():
    return {
        "project": "RescueSphere",
        "message": "AI Disaster Relief Coordination Platform is running",
        "status": "active"
    }