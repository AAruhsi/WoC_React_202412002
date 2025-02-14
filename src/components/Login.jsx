import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase"; // Ensure you're importing Firebase auth

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth); // Correct auth state access

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reset any previous login error

    if (!validate()) {
      return; // Don't proceed if there are validation errors
    }

    try {
      // Firebase authentication for login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User logged in successfully");
      alert("Login successful!");

      // Dispatch login action to update Redux state with userId
      const userId = userCredential.user.uid; // Firebase gives user ID in `uid`
      dispatch(login({ userId }));

      // Navigate to editor after login
      navigate("/editor");
    } catch (error) {
      console.error("Login error: ", error);
      setLoginError("Invalid email or password.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center gap-10 bg-gray-900 py-10">
      <Navbar />
      {!authState.isAuthenticated && (
        <div className="w-80 bg-gray-800 rounded-lg p-8 text-gray-100">
          <p className="text-center text-2xl font-bold">Login</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
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
              <div className="flex justify-end mt-2 text-xs text-gray-400">
                <a href="#">Forgot Password?</a>
              </div>
            </div>
            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}
            <button className="w-full bg-indigo-500 py-3 rounded-lg text-gray-900 font-semibold">
              Login
            </button>
          </form>
          <div className="flex items-center py-4">
            <div className="flex-1 border-t border-gray-600"></div>
            <p className="px-4 text-sm text-gray-400">Login with Google</p>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              aria-label="Log in with Google"
              className="p-3 bg-transparent rounded-md hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-6 h-6 text-white"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
