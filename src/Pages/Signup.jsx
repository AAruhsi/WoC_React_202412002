import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully:", formData);
      // Handle successful form submission here (e.g., API call)
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
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-400 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
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
