import "./App.css";
import { NavigationBar } from "./Dashboard";
import React, { Component } from "react";
import axios from "axios";

class Materials extends Component {
  viewHandler = async (item) => {
    console.log("IN HEREEEEEEEEEE");
    axios(`http://localhost:8000/head/materials/${item}`, {
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#607D8B", height: "100vh" }}>
        <NavigationBar />
        <div style={{ alignItems: "center", flexDirection: "column" }}>
          <h1 style={{ textAlign: "center", padding: 20 }}> Head Module</h1>
          <div
            style={{
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "salmon",
              padding: 20,
            }}
          >
            <button
              style={{
                backgroundColor: "pink",
                marginLeft: "45%",
                marginBottom: 20,
              }}
              onClick={() => this.viewHandler("lec1")}
            >
              View Lec1
            </button>
            <br></br>
            <button
              style={{
                backgroundColor: "pink",
                marginLeft: "45%",
                marginBottom: 20,
              }}
              onClick={() => this.viewHandler("lec2")}
            >
              View Lec2
            </button>
            <br></br>
            <button
              style={{
                backgroundColor: "pink",
                marginLeft: "45%",
                marginBottom: 20,
              }}
              onClick={() => this.viewHandler("lec3")}
            >
              View Lec3
            </button>
            <br></br>
            <button
              style={{
                backgroundColor: "pink",
                marginLeft: "45%",
                marginBottom: 20,
              }}
              onClick={() => this.viewHandler("lec4")}
            >
              View Lec4
            </button>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}
export default Materials;
