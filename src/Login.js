import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // ✅ Validation
  const validate = () => {
    let err = {};

    if (!formData.userId) {
      err.userId = "User ID is required";
    }

    if (
      !formData.password ||
      formData.password.length < 8 ||
      formData.password.length > 12
    ) {
      err.password = "Password must be 8 to 12 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0; // Object.keys(err) -> {userId, password}
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Login Logic
  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        const users = response.data;

        const validUser = users.find(
          (user) =>
            user.email === formData.userId &&
            user.password === formData.password
        );

        if (validUser) {
          setMessage("Login successful!");
          setErrors({});

          // store login state
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", JSON.stringify(validUser));

          setTimeout(() => {
            navigate("/home");
            console.log('home');
          }, 1000);
        } else {
          setMessage("");
          setErrors({ api: "Invalid User ID or Password" });
        }
      })
      .catch(() => {
        setErrors({ api: "Server error. Please try again later." });
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="userId"
          placeholder="User ID / Email"
          onChange={handleChange}
        />
        {errors.userId && <span>{errors.userId}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
