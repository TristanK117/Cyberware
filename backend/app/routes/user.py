from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from firebase_admin import firestore, auth as firebase_auth
from datetime import datetime
from typing import Optional
from app.auth import verify_id_token

router = APIRouter()
db = firestore.client()


class CreateUserRequest(BaseModel):
    email: str


@router.post("/users/create")
async def create_user(req: CreateUserRequest, uid: str = Depends(verify_id_token)):
    """
    Create a user profile in Firestore after Firebase Auth signup.
    Called from the client after successful Firebase Auth registration.
    
    Requires: Authorization header with Firebase ID token (Bearer <token>)
    The UID is extracted from the verified token, preventing spoofing.
    """
    try:
        if not req.email:
            raise HTTPException(status_code=400, detail="email is required")

        # Create user document in Firestore using verified UID
        user_ref = db.collection("users").document(uid)
        user_ref.set({
            "email": req.email,
            "displayName": "New User",
            "modulesCompleted": [],
            "moduleProgress": {},
            "chatHistory": {},
            "createdAt": datetime.now(),
        }, merge=True)

        return {
            "success": True,
            "message": "User profile created successfully",
            "uid": uid
        }

    except Exception as e:
        print(f"Error creating user profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to create user profile")


@router.get("/users/me")
async def get_user(uid: str = Depends(verify_id_token)):
    """
    Get current authenticated user's profile from Firestore.
    
    Requires: Authorization header with Firebase ID token (Bearer <token>)
    The 'me' endpoint automatically serves the authenticated user's profile,
    eliminating the possibility of accessing other users' data.
    """
    try:
        user_ref = db.collection("users").document(uid)
        user = user_ref.get()

        if not user.exists:
            raise HTTPException(status_code=404, detail="User not found")

        return {"success": True, "data": user.to_dict()}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching user: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch user profile")