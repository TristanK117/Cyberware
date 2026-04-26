from fastapi import Depends, HTTPException, Header
from firebase_admin import auth as firebase_auth
from typing import Optional


async def verify_id_token(authorization: Optional[str] = Header(None)) -> str:
    """
    Verify Firebase ID token from Authorization header.
    Extracts and returns the authenticated user's UID.
    
    Authorization header should be: "Bearer <id_token>"
    
    Raises:
        HTTPException: 401 if token is missing or invalid
    """
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )
    
    # Extract token from "Bearer <token>"
    try:
        scheme, token = authorization.split(" ")
        if scheme.lower() != "bearer":
            raise ValueError("Invalid authorization scheme")
    except ValueError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format. Expected: Bearer <token>"
        )
    
    try:
        # Verify the ID token with Firebase
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get("uid")
        
        if not uid:
            raise HTTPException(
                status_code=401,
                detail="Invalid token: no uid found"
            )
        
        return uid
    
    except firebase_auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid ID token"
        )
    except firebase_auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="ID token has expired"
        )
    except firebase_auth.RevokedIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="ID token has been revoked"
        )
    except Exception as e:
        print(f"Token verification error: {e}")
        raise HTTPException(
            status_code=401,
            detail="Token verification failed"
        )
