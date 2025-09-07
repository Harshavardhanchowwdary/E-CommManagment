import React, { useState } from 'react';
import './StockForm.css';
import { useAppContext } from '../../Context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

function StockUpdateForm({ onClose }) {
  const { Products } = useAppContext();
  const productList = Products?.data || [];
  const Backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/"

  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    type: 'IN',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${Backendurl}api/Ecommanagement/AddStock`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Stock updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="stock-form-overlay">
      <form className="stock-form" onSubmit={handleSubmit}>
        <h2>Update Stock</h2>

        <select name="product" required onChange={handleChange}>
          <option value="">Select Product</option>
          {productList.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          required
          onChange={handleChange}
        />

        <select name="type" onChange={handleChange}>
          <option value="IN">IN (Add to Stock)</option>
          <option value="OUT">OUT (Remove from Stock)</option>
        </select>

        <button type="submit">Submit</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default StockUpdateForm;