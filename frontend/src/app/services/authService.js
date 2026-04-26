import { auth } from '../firebase';

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
