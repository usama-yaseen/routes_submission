import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { Dashboard } from "./Dashboard";
import { Addmarks } from "./Dashboard";
import Materials from "./materials";
import { Assignstudents } from "./AssignStudent";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/addmarks" element={<Addmarks />} />
      <Route exact path="/materials" element={<Materials />} />
      <Route exact path="/Assign" element={<Assignstudents />} />
    </Routes>
  );
}
