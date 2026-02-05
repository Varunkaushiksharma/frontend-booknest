import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./login.css";

function Login() {
    const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", credentials);

      const token = res.data.token;

      // Save token to localStorage (or cookie if you prefer)
      localStorage.setItem("token", token);

      alert("Login successful!");
      navigate("/"); // or home or wherever
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || "Server error"));
    }
  };
  return (
    <>
      <div id="login">
        <h1>Login</h1>
       <form className="form" onSubmit={handleSubmit}>
  <span className="input-span">
    <label htmlFor="email" className="label">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      value={credentials.email}
      onChange={handleChange}
      required
    />
  </span>
  <span className="input-span">
    <label htmlFor="password" className="label">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      value={credentials.password}
      onChange={handleChange}
      required
    />
  </span>
  <span className="span">
    <a href="#">Forgot password?</a>
  </span>
  <button type="submit" className='btnn'>Login</button>
  <span className="span">
    Don't have an account? <Link to="/signup">SignUp</Link>
  </span>
</form>

      </div>
    </>
  );
}

export default Login;
