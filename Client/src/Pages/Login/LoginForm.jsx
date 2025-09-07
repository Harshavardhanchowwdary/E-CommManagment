import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import {toast} from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
    const navigate = useNavigate();
    const Backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try{
        const response = await axios.post(`${Backendurl}api/Ecommanagement/UserLogin`,formData,{
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    });
    if(response.data.success){
        toast.success(response.data.message);
        navigate('/Home');
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",response.data.user.name);
        console.log("Logined with in:",formData);
    }else{
        toast.error(response.data.message);
        console.log("User not registered with:",formData);
    }
    }catch(error){
        toast.error(error?.response?.data?.message || error.message || "Server Error");
        console.log(error?.response?.data?.message || error.message || "Server Error");
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back to Your Inventory Dashboard</h2>
        <p className="subtext">Log in to manage products, track stock, and stay in control.⚠️ For the best experience: Please open this site on a larger device like a laptop or desktop. The dashboard is designed to be interactive and visually rich — and it truly shines on bigger screens!
</p>

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

        <button type="submit">Login</button>

        <p className="register-link">
          New here? <Link to="/">Register first</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;