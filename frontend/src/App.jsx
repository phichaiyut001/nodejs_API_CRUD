import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Create from "../pages/Create";
import User from "../pages/User";
import Navbar from "../pages/nav";

function App() {
  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:8080/users");
  //   setArray(response.data);
  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Router */}
        <Routes>
          <Route path="/" />
          <Route path="/create" element={<Create />} />
          <Route path="/users" element={<User />} />
          {/* Fallback route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
