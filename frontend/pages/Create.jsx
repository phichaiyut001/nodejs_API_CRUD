import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    interests: "",
    description: "",
  });

  // ฟังก์ชันเก็บค่าจาก input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ฟังก์ชันส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users",
        formData
      );
      console.log("Server response:", response.data);
      alert("Submit success!");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submit failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">ชื่อจริง</label>
        <input
          type="text"
          name="firstname"
          placeholder="กรอกชื่อจริง"
          value={formData.firstname}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <label className="form-label">นามสกุล</label>
        <input
          type="text"
          name="lastname"
          placeholder="กรอกนามสกุล"
          value={formData.lastname}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <label className="form-label">อายุ</label>
        <input
          type="number"
          name="age"
          placeholder="กรอกอายุ"
          value={formData.age}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        {/* Gender */}
        <div className="mb-2">
          <label className="form-label">เพศ</label>
          <label>Gender: </label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="ชาย"
              checked={formData.gender === "ชาย"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">ชาย</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="หญิง"
              checked={formData.gender === "หญิง"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">หญิง</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="ไม่ระบุ"
              checked={formData.gender === "ไม่ระบุ"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">ไม่ระบุ</label>
          </div>
        </div>
        <label className="form-label">สิ่งที่สนใจ</label>
        <input
          type="text"
          name="interests"
          placeholder="Interest"
          value={formData.interests}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <label className="form-label">เพิ่มเติม</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
