import firebase_admin
from firebase_admin import firestore
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# ------------------ Firebase (SAFE INIT) ------------------
db = None

try:
    if not firebase_admin._apps:
        firebase_admin.initialize_app()
    db = firestore.client()
    print("Firebase initialized (Cloud Run mode)")
except Exception as e:
    print("Firebase init failed:", e)
    db = None
# ------------------ Import Routes ------------------
from app.routes.chat import router as chat_router
from app.routes.user import router as user_router

# ------------------ FastAPI App ------------------
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://cyberaware-46a6b.web.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Routes ------------------

# Health check
@app.get("/")
def health():
    return {
        "status": "running",
        "firebase": "connected" if db else "not connected"
    }


# Include routes
app.include_router(chat_router)
app.include_router(user_router)
