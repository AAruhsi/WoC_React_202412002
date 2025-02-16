import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice.js";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClick = () => {
    navigate("/");
  };
  const handleGuestClick = () => {
    navigate("/editor");
  };
  const handleLoginLogoutClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-helvita flex w-[250px] h-[40px] items-center justify-around text-center text-lg">
      {/* First button to navigate to home page */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent  transition-transform duration-300 hover:-translate-y-1"
        onClick={handleClick}
      >
        Home
      </button>

      {/* Second button to navigate to /editor */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent  transition-transform duration-300 hover:-translate-y-1"
        onClick={handleGuestClick}
      >
        <svg
          className=" w-5 h-5"
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Guest
      </button>

      {/* Third button to navigate to /login  logout */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent  transition-transform duration-300 hover:-translate-y-1"
        onClick={handleLoginLogoutClick}
      >
        <svg
          className=" w-5 h-5"
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={9} cy={21} r={1} />
          <circle cx={20} cy={21} r={1} />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {isAuthenticated ? "Logout" : "Login"}
      </button>

      {/* Fourth button with a custom SVG */}
      {/* <button className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent  transition-transform duration-300 hover:-translate-y-1">
        <svg
          className=" w-5 h-5"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
        </svg>
      </button> */}
    </div>
  );
};

export default Navbar;
