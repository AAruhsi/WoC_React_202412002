import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeEditor from "./Pages/Editor.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./components/Login.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
