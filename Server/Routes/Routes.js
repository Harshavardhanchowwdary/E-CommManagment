const express = require('express');
const {UserRegistration,UserLogin,SupplierRegister,AddProduct,AddStock,AllSupliers,AllProducts,AllStockTransitions,authentication,TotalSuppliers,TotalProducts,TotalStock,TotalStockTransitions} = require('../Controllers/MainContollers')
const authRouter = express.Router();

authRouter.post('/UserRegisteration',UserRegistration); 
authRouter.post('/UserLogin',authentication,UserLogin); 
authRouter.post('/AddSupplier',SupplierRegister); 
authRouter.post('/AddProduct',authentication,AddProduct); 
authRouter.post('/AddStock',authentication,AddStock); 
authRouter.get('/getAllSuppliers',authentication,AllSupliers);
authRouter.get('/getAllProducts',authentication,AllProducts);
authRouter.get('/getAllStockTransitions',authentication,AllStockTransitions); 
authRouter.get('/TotalSuppliers',authentication,TotalSuppliers);
authRouter.get('/TotalProducts',authentication,TotalProducts);
authRouter.get('/TotalStock',authentication,TotalStock);
authRouter.get('/TotalStockTransitions',authentication,TotalStockTransitions);
module.exports = {
    authRouter
}