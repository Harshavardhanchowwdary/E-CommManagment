import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Maindashboard from '../../Components/Maindashboard/Maindashboard';
import Productspage from '../Products/Productspage';
import './Home.css';
import SuppliersPage from '../Suppliers/SuppliersPage';
import StockTransitions from '../StockTranisitions/StockTransitions'
import { useAppContext } from '../../Context/Appcontext';
function Home() {
  const [maincomponent, setMaincomponent] = useState(true);
  const [productscomponent, setProductscomponent] = useState(false);
  const [supplierscomponent, setSupplierscomponent] = useState(false);
  const [stocktranisitions, setStockTranisitionscomponent] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const {Totalsuppliers,TotalProducts,Totalstock,Totalstocktransitions} = useAppContext();
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="MainContent">
      <div className="Sidebar">
        <Sidebar
          setMaincomponent={setMaincomponent}
          setProductscomponent={setProductscomponent}
          setSupplierscomponent={setSupplierscomponent}
          setStockTranisitionscomponent={setStockTranisitionscomponent}
        />
      </div>

      <div className="MainAllContentProduct">
        <header className="dashboard-header">
  <h1 className="dashboard-title">
    <i className="fas fa-store"></i> E-Commerce Inventory Dashboard
  </h1>

  <div className="dashboard-actions">
    <button className="theme-toggle" onClick={toggleTheme}>
      <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
    </button>

    <div className="user-indicator">
      <i className="fas fa-user-circle"></i>
      <span className="user-label">{localStorage.getItem("user")}</span>
    </div>
  </div>
</header>

        <div className="dashboard-summary">
          <div className="summary-card">
            <i className="fas fa-truck"></i>
            <h3>Total Suppliers</h3>
            <p>{Totalsuppliers.TotalSuppliers}</p>
          </div>
          <div className="summary-card">
            <i className="fas fa-box-open"></i>
            <h3>Total Products</h3>
            <p>{TotalProducts.TotalProducts}</p>
          </div>
          <div className="summary-card">
            <i className="fas fa-warehouse"></i>
            <h3>Total Stock</h3>
            <p>{Totalstock.TotalStock}</p>
          </div>
          <div className="summary-card">
            <i className="fas fa-exchange-alt"></i>
            <h3>Total Transitions</h3>
            <p>{Totalstocktransitions.TotalStockTransitions}</p>
          </div>
        </div>

        <div className="dashboard-body">
          {maincomponent && <Maindashboard />}
          {productscomponent && <Productspage />}
          {supplierscomponent && <SuppliersPage />}
          {stocktranisitions && <StockTransitions />}
        </div>
      </div>
    </div>
  );
}

export default Home;