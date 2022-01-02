import React from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export const Dashboard = () => {
  console.log("Hello In Dash-Board");
  return (
    <div style={{ backgroundColor: "#607D8B", height: "100vh" }}>
      <NavigationBar />
      <h1 style={{ textAlign: "center", color: "white" }}>Dashboard</h1>
    </div>
  );
};
export const Addmarks = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [recievedData, setreceivedData] = React.useState([]);
  const [GPA, setGPA] = React.useState([]);

  const addMarks = (data_to_be_posted, index) => {
    axios
      .post("http://localhost:8000/Teacher/addMarks", data_to_be_posted)
      .then((Response) => {
        alert(Response.data);
        let temp = { GPA };
        temp[index] = 0;
        setGPA(temp);
      });
  };
  const getData = () => {
    axios("http://localhost:8000/Teacher/getStudents").then((Response) => {
      console.log(Response.data);
      setreceivedData(Response.data);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    console.log("here");
    setLoading(true);
    getData();
  }, []);

  if (isLoading)
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>LOADING</h1>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#607D8B", height: "100vh" }}>
      <NavigationBar />
      <h1 style={{ textAlign: "center", color: "white" }}>
        List Of Students ( In Database )
      </h1>
      <Table variant="dark" striped hover bordered>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>#</th>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Marks</th>
            <th style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {recievedData.StudentData.map((data, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{index}</td>
                <td style={{ textAlign: "center" }}>{data._id}</td>
                <td style={{ textAlign: "center" }}>
                  <input
                    name="marks"
                    value={GPA[index]}
                    onChange={(e) => {
                      let temp = { GPA };
                      temp[index] = e.target.value;
                      setGPA(temp);
                    }}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => {
                      let datatobesent = {
                        class_name: recievedData.ClassData.Class,
                        Course_id: recievedData.ClassData.CourseID,
                        S_ID: data._id,
                        marks: GPA[index],
                      };
                      addMarks(datatobesent, index);
                    }}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" style={{ paddingRight: "2%" }}>
      <Nav className="me-auto">
        <Nav.Link href="/">Dashboard</Nav.Link>
        <Nav.Link href="/addMarks">Add Marks</Nav.Link>
        <Nav.Link href="/materials">Materials</Nav.Link>
        <Nav.Link href="/Assign">Assign Students</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#Logout">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};
