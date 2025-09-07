const mongoose = require('mongoose');

// Users 
const UserSchema = new mongoose.Schema({
    name: { type: String, maxlength: 40, required: true },
    email: { type: String, maxlength: 40, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true }
}, { timestamps: true });

// Suppliers 
const SupplierSchema = new mongoose.Schema({
    name: { type: String, maxlength: 40, required: true },
    company: { type: String, maxlength: 40 },
    email: { type: String, maxlength: 40, required: true },
    phone: { type: Number }
}, { timestamps: true });

// Products
const ProductSchema = new mongoose.Schema({
    name: { type: String, maxlength: 40, required: true },
    category: { type: String },
    costprice: { type: Number },
    price: { type: Number },
    quantity: { type: Number },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }
}, { timestamps: true });

// Stock Updates
const StockTransactionSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    type: { type: String, enum: ["IN", "OUT"], required: true }
}, { timestamps: true });

// ✅ Create Models
const User = mongoose.model("User", UserSchema);
const Supplier = mongoose.model("Supplier", SupplierSchema);
const Product = mongoose.model("Product", ProductSchema);
const StockTransaction = mongoose.model("StockTransaction", StockTransactionSchema);

// ✅ Export all in list
module.exports = {
    User,
    Supplier,
    Product,
    StockTransaction
};
