import React from "react";
import "./sidebar.css";

const Sidebar = ({ setMaincomponent, setProductscomponent, setSupplierscomponent,setStockTranisitionscomponent
}) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Inventory Dashboard</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={()=>{
            setMaincomponent(true);
            setProductscomponent(false),
            setSupplierscomponent(false),
            setStockTranisitionscomponent(false)
        }}>Main</li>
        <li className="sidebar-item" onClick={()=>{
            setMaincomponent(false),
            setProductscomponent(true),
            setSupplierscomponent(false),
            setStockTranisitionscomponent(false)
        }}>Products</li>
        <li className="sidebar-item" onClick={()=>{
            setMaincomponent(false),
            setProductscomponent(false),
            setSupplierscomponent(true),
            setStockTranisitionscomponent(false)
        }}>Suppliers</li>
        <li className="sidebar-item" onClick={()=>{
            setMaincomponent(false),
            setProductscomponent(false),
            setSupplierscomponent(false),
            setStockTranisitionscomponent(true)
        }}>Stock Transitions</li>
      </ul>
    </div>
  );
};

export default Sidebar;

