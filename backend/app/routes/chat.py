import requests
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(req: ChatRequest):
    try:
        response = requests.post(
            "http://localhost:8001/chat",
            json={"message": req.message},
            timeout=5
        )
        return response.json()
    except Exception as e:
        return {"response": "ML service unavailable"}