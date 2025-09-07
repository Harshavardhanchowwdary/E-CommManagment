import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";
import axios from 'axios'
import {toast} from  'react-hot-toast'
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const Backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send to backend or handle registration logic here 
    try{
      const response = await axios.post(`${Backendurl}api/Ecommanagement/UserRegisteration`,formData,{
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
      });
      if(response.data.success){
        toast.success(response.data.message);
        navigate('/login');
        console.log("Registering user:", formData);
      }else{
        toast.error(response.data.message);
        console.log("Not Registering user:", response.data.message);
      }
    }catch(error){
      toast.error(error?.response?.data?.message || error.message || "Server Error");
       console.log("Server Error:", error.response.data.message || error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Welcome to the E-Commerce Inventory Dashboard</h2>
        <p className="subtext">Register first to manage your inventory, track products, and streamline your business.
          ⚠️ For the best experience: Please open this site on a larger device like a laptop or desktop. The dashboard is designed to be interactive and visually rich — and it truly shines on bigger screens!

        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          maxLength="40"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          maxLength="40"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;