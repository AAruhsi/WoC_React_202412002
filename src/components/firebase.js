// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc, // Import updateDoc to update document data
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD58OflyyVK7-UgVIoOZdi04lU8Z8ywWIw",
  authDomain: "code-editor-3bf4f.firebaseapp.com",
  projectId: "code-editor-3bf4f",
  storageBucket: "code-editor-3bf4f.firebasestorage.app",
  messagingSenderId: "701577968584",
  appId: "1:701577968584:web:7bffbcb99cbd0988c31efd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Function to save code to Firestore
const saveCodeToFirestore = async (userId, fileId, codeContent) => {
  try {
    // Create a reference to the specific file document
    const fileRef = doc(db, "Users", userId, "files", fileId);

    // Update the document's content field with the new code
    await updateDoc(fileRef, {
      content: codeContent, // Add or update the 'content' field
    });

    console.log("Code successfully saved to Firestore!");
  } catch (error) {
    console.error("Error saving code to Firestore:", error);
  }
};

export {
  app,
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  saveCodeToFirestore,
  getDoc,
};

// Export app as the default export
export default app;
