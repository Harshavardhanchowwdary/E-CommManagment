import React, { useState } from 'react';
import './SuppliersPage.css';
import { useAppContext } from '../../Context/Appcontext';
import SupplierForm from '../../Components/AddSupplier/SupplierForm'; 

function SuppliersPage() {
  const { Suppliersdata } = useAppContext();
  const supplierList = Suppliersdata?.data || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  

  const filteredSuppliers = supplierList.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="suppliers-page">
      <div className="suppliers-header">
        <h2><i className="fas fa-truck"></i> All Suppliers</h2>
        <button className="add-supplier-btn" onClick={() => setShowForm(true)}>
          <i className="fas fa-user-plus"></i> Add Supplier
        </button>
      </div>
    {showForm && <SupplierForm onClose={() => setShowForm(false)} />}

      <div className="suppliers-search">
        <input
          type="text"
          placeholder="Search by supplier name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="suppliers-grid">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((supplier, index) => (
            <div key={index} className="supplier-card">
              <i className="fas fa-user-tie"></i>
              <h3>{supplier.name}</h3>
              <p>Email: {supplier.email || 'N/A'}</p>
              <p>Phone: {supplier.phone || 'N/A'}</p>
              <p>Company: {supplier.company || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No suppliers found.</p>
        )}
      </div>

      {showForm && <SupplierForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default SuppliersPage;