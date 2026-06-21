from pydantic import BaseModel


class ResourceCreate(BaseModel):
    name: str
    resource_type: str