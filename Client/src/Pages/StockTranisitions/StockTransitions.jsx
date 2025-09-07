import React  from 'react';
import './StockTransitions.css';
import { useAppContext } from '../../Context/Appcontext';
import StockUpdateForm from '../../Components/StockUpdate/StockForm';
import { useState } from 'react';
function StockTransitions() {
  const { StoctTranistionsdata, Products } = useAppContext();
  const transitions = StoctTranistionsdata?.data || [];
  const productList = Products?.data || [];
   const [showForm, setShowForm] = useState(false);
  // Calculate total revenue from OUT transitions
  const totalRevenue = transitions
    .filter(t => t.type === 'OUT')
    .reduce((acc, t) => {
      const product = productList.find(p => String(p._id) === String(t.product));
      const price = product?.price || 0;
      return acc + price * t.quantity;
    }, 0);

  return (
    <div className="stock-page">
      <div className="stock-header">
        <div className="revenue-card">
          <i className="fas fa-rupee-sign"></i>
          <div>
            <h3>Total Revenue</h3>
            <p>₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <button className="update-stock-btn" onClick={() => setShowForm(true)}>
          <i className="fas fa-sync-alt"></i> Update Stock
        </button>
      </div>
      {showForm && <StockUpdateForm onClose={() => setShowForm(false)} />}

      <h2 className="stock-title">
        <i className="fas fa-boxes-stacked"></i> Recent Stock Transitions
      </h2>

      <div className="stock-list">
        {transitions.map((t, index) => {
          const product = productList.find(p => String(p._id) === String(t.product));
          return (
            <div key={index} className={`stock-item ${t.type === 'IN' ? 'in-stock' : 'out-stock'}`}>
              <i className={`fas ${t.type === 'IN' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
              <div>
                <h4>{product?.name || 'Unknown Product'}</h4>
                <p>{t.type === 'IN' ? 'Received' : 'Dispatched'} {t.quantity} units</p>
                <p>Date: {new Date(t.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StockTransitions;
