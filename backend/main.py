import firebase_admin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from firebase_admin import credentials, firestore
from datetime import datetime 
import os

# Initialize Firebase Admin SDK
key_path = os.getenv("FIREBASE_KEY_PATH", "./serviceAccountKey.json")

if not firebase_admin._apps:  # Prevent re-initialization on hot reload
    try:
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
        print("Firebase initialized with service account.")
    except FileNotFoundError:
        firebase_admin.initialize_app()
        print("Firebase initialized with default credentials.")

db = firestore.client()

from app.database import engine
from app.routes.chat import router as chat_router
from app.routes.user import router as user_router
# test
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
def health():
    return {"status": "running"}

# DB test
@app.get("/db-test")
def db_test():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"db": "connected"}

# Include routes
app.include_router(chat_router)
app.include_router(user_router)