import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/api/home" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/api/dashboard" element={<Dashboard />} />
        <Route exact path="/api/user/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
