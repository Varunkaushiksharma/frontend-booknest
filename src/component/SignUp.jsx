import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();

  // State to hold form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Update state on input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/signup",
      formData
    );

    if (response.status === 200) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert("Signup failed: " + (response.data.message || "Unknown error"));
    }
  } catch (error) {
    alert("Error connecting to server: " + error.message);
  }
};


  return (
    <div id="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="acc">
        Already have an account?{" "}
        <span>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
