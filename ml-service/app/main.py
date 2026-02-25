from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def health():
    return {"status": "ml-service running"}


@app.post("/chat")
def chat(req: ChatRequest):
    # Temporary stub logic
    return {"response": f"ML service received: {req.message}"}