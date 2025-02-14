import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db, addDoc, collection } from "../components/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

// Function to create the default welcome.js file for the user
const createWelcomeFile = async (userId) => {
  const defaultContent = `function welcome() {\n\tconsole.log("Welcome to CHAP The code editor!");\n}\n\nwelcome();\n`;

  const newFile = {
    name: "welcome",
    type: "js",
    content: defaultContent, // Default content based on language
  };

  try {
    const docRef = await addDoc(
      collection(db, "Users", userId, "files"),
      newFile
    );
    console.log("Document written with ID: ", docRef.id);
    dispatch(addFile({ ...newFile, id: docRef.id }));
    closeModal();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState(""); // Define firebaseError state

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError(""); // Reset Firebase error message

    if (!validate()) {
      return; // Stop if validation fails
    }

    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      alert("User created successfully!");

      if (user) {
        // Create user document in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: formData.username, // Save the username from the form
        });

        // Create the default welcome.js file
        await createWelcomeFile(user.uid);
      }

      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Firebase Error:", error);
      setFirebaseError(error.message); // Display Firebase error to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900 py-10">
      <div className="w-80 bg-gray-800 rounded-lg p-8 text-gray-100">
        <p className="text-center text-2xl font-bold">Sign Up</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm text-gray-400 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm text-gray-400 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {firebaseError && (
            <p className="text-red-500 text-sm text-center">{firebaseError}</p>
          )}

          <button className="w-full bg-indigo-500 py-3 rounded-lg text-gray-900 font-semibold">
            Sign up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
