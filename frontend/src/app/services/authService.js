import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

/**
 * Get Firebase ID token for authenticated user
 * This token should be sent in Authorization header for all API calls
 * 
 * @returns {Promise<string>} The ID token, or null if user is not authenticated
 */
export async function getIdToken() {
  if (!auth.currentUser) {
    throw new Error('User not authenticated');
  }

  return await auth.currentUser.getIdToken(false);
}

/**
 * Make an authenticated API call with ID token in Authorization header
 * 
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} The fetch response
 */
export async function authenticatedFetch(url, options = {}) {
  try {
    const idToken = await getIdToken();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
      ...options.headers,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

/**
 * Sign in or create account using Google
 * Returns the user credential
 * 
 * @returns {Promise<UserCredential>} Firebase user credential
 */
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}

/**
 * Create user profile in backend after successful signup
 * 
 * @param {object} user - Firebase user object
 * @returns {Promise<object>} Response from backend
 */
export async function createUserProfile(user) {
  try {
    const response = await authenticatedFetch('http://localhost:8000/users/create', {
      method: 'POST',
      body: JSON.stringify({ email: user.email })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}