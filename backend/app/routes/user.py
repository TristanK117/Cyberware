from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from firebase_admin import firestore
from datetime import datetime

router = APIRouter()
db = firestore.client()


class CreateUserRequest(BaseModel):
    uid: str
    email: str


@router.post("/users/create")
def create_user(req: CreateUserRequest):
    """
    Create a user profile in Firestore after Firebase Auth signup.
    Called from the client after successful Firebase Auth registration.
    """
    try:
        if not req.uid or not req.email:
            raise HTTPException(status_code=400, detail="uid and email are required")

        # Create user document in Firestore
        user_ref = db.collection("users").document(req.uid)
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
            "uid": req.uid
        }

    except Exception as e:
        print(f"Error creating user profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to create user profile")


@router.get("/users/{uid}")
def get_user(uid: str):
    """Get user profile from Firestore."""
    try:
        user_ref = db.collection("users").document(uid)
        user = user_ref.get()

        if not user.exists:
            raise HTTPException(status_code=404, detail="User not found")

        return {"success": True, "data": user.to_dict()}

    except Exception as e:
        print(f"Error fetching user: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch user profile")