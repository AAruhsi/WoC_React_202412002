import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db, addDoc, collection } from "../components/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";

// Function to create the default welcome.js file for the user
const createWelcomeFile = async (userId, dispatch) => {
  const defaultContent = `function welcome() {\n\tconsole.log("Welcome to CodeCanvas The code editor!");\n}\n\nwelcome();\n`;

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
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
        await createWelcomeFile(user.uid, dispatch);
      }
      navigate("/login");
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

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // If user is new, create a user document
          await setDoc(userRef, {
            email: user.email,
            username: user.displayName || "New User",
          });

          // Create a default welcome.js file
          await createWelcomeFile(user.uid);
        }

        // Dispatch login action to Redux
        dispatch(login({ userId: user.uid, email: user.email }));

        // Navigate to the editor
        navigate("/editor");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setFirebaseError(error.message);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 font-helvita">
      <div className="w-96 bg-white rounded-lg p-8 shadow-xl">
        <p className="text-center text-2xl font-semibold text-gray-900">
          Sign Up
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>
          {firebaseError && (
            <p className="text-red-400 text-sm text-center">{firebaseError}</p>
          )}
          <button className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-500 transition">
            Sign up
          </button>
        </form>
        <div className="flex flex-col justify-center items-center mt-4 border-t pt-4">
          <p> Sign in with Google</p>
          <button
            className="p-2 text-gray-800 rounded hover:scale-110 flex items-center"
            onClick={signInWithGoogle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-6 h-6 mr-2"
            >
              <path
                d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
