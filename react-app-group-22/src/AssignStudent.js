import React, { useState } from "react";
import { NavigationBar } from "./Dashboard";

export const Assignstudents = () => {
  const [cid, setcid] = useState(null);
  const [sid, setsid] = useState(null);
  const AssignStudent = async () => {
    let item = [cid, sid];
    await fetch(`http://localhost:8000/admin/assignstudent/${cid}/${sid}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (response.ok) {
        alert("Updated Successfully");
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    });
  };
  return (
    <div style={{ backgroundColor: "#607D8B", height: "100vh" }}>
      <NavigationBar />
      <h1 style={{ textAlign: "center" }}>Assign Student to Class</h1>
      <div
        style={{
          display: "flex",
          flexDirection:'column',
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
          borderWidth: 10,
        }}
      >
        <h3 style={{ textAlign: "center" }}> Enter Class Id:</h3>

        <input
          style={{ border: "2px solid purple", alignSelf: "center" }}
          type="text"
          value={cid}
          onChange={(event) => setcid(event.target.value)}
        />

        <h3 style={{ textAlign: "center" }}> Enter Student Id:</h3>

        <input
          style={{ border: "2px solid purple", marginBottom: 30 }}
          type="text"
          value={sid}
          onChange={(event) => setsid(event.target.value)}
        />

        <button onClick={AssignStudent}> Assign Student </button>
      </div>
    </div>
  );
};
