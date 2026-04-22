from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ml_service import MLService

router = APIRouter()
ml_service = MLService()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(req: ChatRequest):
    return await ml_service.generate_response(req.message)