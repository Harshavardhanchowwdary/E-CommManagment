import React from 'react';
import './Maindashboard.css';
import { useAppContext } from '../../Context/Appcontext';

function Maindashboard() {
  const { Products, Suppliersdata, StoctTranistionsdata } = useAppContext();

  return (
    <div className="MainDashboardcard">
      <section className="dashboard-section">
        <h2><i className="fas fa-star"></i> Best Sellers</h2>
        <ul className="dashboard-list">
          {Products.data?.slice(0, 5).map((product, index) => (
            <li key={index} className="dashboard-item">
              <i className="fas fa-box"></i>
              <span>{product.name}</span>
            </li>

          ))
          }
        </ul>
      </section>

      <section className="dashboard-section">
        <h2><i className="fas fa-user-tie"></i> Top Suppliers</h2>
        <ul className="dashboard-list">
          {Suppliersdata.data?.slice(0, 5).map((supplier, index) => (
            <li key={index} className="dashboard-item">
              <i className="fas fa-truck-loading"></i>
              <span>{supplier.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard-section">
        <h2><i className="fas fa-sync-alt"></i> Recent Stock Transitions</h2>
        <ul className="dashboard-list">
          {StoctTranistionsdata.data?.slice(0, 5).map((transition, index) => (
            <li key={index} className="dashboard-item">
              <i className="fas fa-exchange-alt"></i>
              <span>
                {transition.type === 'IN'
                  ? `Received ${transition.quantity} units into stock`
                  : `Dispatched ${transition.quantity} units from stock`}
              </span>
            </li>
          ))}

        </ul>
      </section>
    </div>
  );
}

export default Maindashboard;