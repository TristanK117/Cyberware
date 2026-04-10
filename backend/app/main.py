from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime 

try:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
    print("Firebase Admin SDK initialized successfully with service account key.")
except Exception as e:
    print(f"Error initializing Firebase Admin SDK with service account: {e}")
    print("Attempting to initialize with default credentials (e.g., for Cloud Functions, Cloud Run)...")
    firebase_admin.initialize_app() # This works if deployed on Google Cloud
    print("Firebase Admin SDK initialized successfully with default credentials.")

db = firestore.client()
from app.database import engine
from app.routes.chat import router as chat_router
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