import React, { useState } from 'react';
import './Productspage.css';
import { useAppContext } from '../../Context/Appcontext';
import ProductForm from '../../Components/AddProduct/ProductForm';
function Productspage() {
  const { Products } = useAppContext();
  const productList = Products?.data || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page">
      <div className="product-header">
        <h2><i className="fas fa-box-open"></i> All Products</h2>
        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          <i className="fas fa-plus"></i> Add Product
        </button>
        {showForm && <ProductForm onClose={() => setShowForm(false)} />}

      </div>

      <div className="product-search">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <i className="fas fa-cube"></i>
              <h3>{product.name}</h3>
              <p>Category: {product.category || 'N/A'}</p>
              <p>Price: ₹{product.price || '0.00'}</p>
              <p>Stock: {product.quantity || '0'}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Productspage;