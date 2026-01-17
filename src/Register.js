import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/register.css";


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // ✅ Validation Function
  const validate = () => {
    let err = {};

    if (!formData.name || formData.name.length < 3) {
      err.name = "Name must be at least 3 characters";
    }

    if (!formData.address) {
      err.address = "Address is required";
    }

    if (!/^\d{10}$/.test(formData.phoneNo)) {
      err.phoneNo = "Phone number must be exactly 10 digits";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      err.email = "Invalid email format";
    }

    if (
      !formData.password ||
      formData.password.length < 8 ||
      formData.password.length > 12
    ) {
      err.password = "Password must be 8–12 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios
      .post("http://localhost:4000/users", formData)
      .then((response) => {
        setSuccess("Registration successful! Redirecting to login...");
        setErrors({});

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        setErrors({ api: "Registration failed. Please try again." });
      });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        {errors.name && <span>{errors.name}</span>}

        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        {errors.address && <span>{errors.address}</span>}

        <input type="text" name="phoneNo" placeholder="Phone Number" onChange={handleChange} />
        {errors.phoneNo && <span>{errors.phoneNo}</span>}

        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}

        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
