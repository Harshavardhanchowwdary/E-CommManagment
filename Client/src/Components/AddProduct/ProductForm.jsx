import React, { useState } from 'react';
import './ProductForm.css';
import { useAppContext } from '../../Context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

function ProductForm({ onClose }) {
  const { Suppliersdata } = useAppContext();
  const supplierList = Suppliersdata?.data || [];
  const Backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/"
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    costprice: '',
    price: '',
    quantity: '',
    supplier: '',
    action: 'add',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${Backendurl}api/Ecommanagement/AddProduct`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      onClose(); // close the modal
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="product-form-overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add / Update Product</h2>

        <input name="name" placeholder="Product Name" required onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="costprice" type="number" placeholder="Cost Price" required onChange={handleChange} />
        <input name="price" type="number" placeholder="Selling Price" required onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" required onChange={handleChange} />

        <select name="supplier" required onChange={handleChange}>
          <option value="">Select Supplier</option>
          {supplierList.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <select name="action" onChange={handleChange}>
          <option value="add">Add / Update</option>
          <option value="delete">Delete</option>
        </select>

        <button type="submit">Submit</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default ProductForm;