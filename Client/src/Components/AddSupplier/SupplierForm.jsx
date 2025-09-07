import React, { useState } from 'react';
import './SupplierForm.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function SupplierForm({ onClose }) {
  const Backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/"
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${Backendurl}api/Ecommanagement/AddSupplier`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Supplier added successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="supplier-form-overlay">
      <form className="supplier-form" onSubmit={handleSubmit}>
        <h2>Add Supplier</h2>

        <input name="name" placeholder="Supplier Name" required onChange={handleChange} />
        <input name="company" placeholder="Company" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="phone" type="number" placeholder="Phone" onChange={handleChange} />

        <button type="submit">Submit</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default SupplierForm;