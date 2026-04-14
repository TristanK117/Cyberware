import httpx
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(req: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:8001/chat",  # ML service
                json={"message": req.message},
                timeout=5
            )

        data = response.json()

        # Basic validation (important)
        if "is_scam" not in data:
            return {
                "is_scam": False,
                "risk_level": "unknown",
                "reason": "Invalid response from ML service"
            }

        return data

    except Exception as e:
        return {
            "is_scam": False,
            "risk_level": "unknown",
            "reason": f"ML service unavailable: {str(e)}"
        }