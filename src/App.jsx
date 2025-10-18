import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Database from "./Component/Database"
import Login from "./Component/Login";
import Register from "./Component/Register";
import Sidnav from "./Component/Sidnav";
import Dashboard from "./Component/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/t" element={<Database />} />
        <Route path="/d" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/s" element={<Sidnav/>} />
      </Routes>
    </Router>
  );
}

export default App;
      