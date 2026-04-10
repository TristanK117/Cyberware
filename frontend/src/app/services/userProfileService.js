import { db, auth } from '../firebase'; // Adjust path as needed
import { doc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


// Function to handle user sign-up and create initial profile
export async function signUpAndCreateProfile(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || "New User",
      modulesCompleted: [],
      moduleProgress: {},
      chatHistory: {},
      createdAt: new Date(),
    }, { merge: true });

    console.log("New user created and profile in Firestore:", user.uid);
    return user;
  } catch (error) {
    console.error("Error during sign-up or profile creation:", error);
    throw error; // Re-throw to be handled by the component calling this function
  }
}

// Function to update user's module progress
export async function updateUserModuleProgress(userId, moduleName, progressData) {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      [`moduleProgress.${moduleName}`]: progressData
    });
    console.log(`Module progress updated for ${moduleName} for user: ${userId}`);
  } catch (error) {
    console.error("Error updating module progress:", error);
    throw error;
  }
}

// ... other functions for chatbot history, fetching user data, etc.