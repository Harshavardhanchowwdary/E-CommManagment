import React, { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import RegisterForm from './Pages/Register/RegisterForm';
import LoginForm from './Pages/Login/LoginForm';
import Home from './Pages/Home/Home';
function App() {
    
  return (
    <div>
        <Toaster/>
        <Routes>
            <Route path='/' element={<RegisterForm/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/Home' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default App