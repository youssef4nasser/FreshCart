import { createBrowserRouter, parsePath, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import Categories from "./components/Categories/Categories"
import Cart from "./components/Cart/Cart"

import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Notfound from "./components/Notfound/Notfound"
import Brands from './components/Brands/Brands';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Productdetails from './components/Productdetails/Productdetails';
import { CartContextProvider } from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import { Offline, Online } from "react-detect-offline";
import BrandProducts from './components/BrandProducts/BrandProducts';

function App() {

useEffect(()=>{
  if(localStorage.getItem("userToken")!== null){
    saveUserData();
  }
},[])

  const [userData, setUserData] = useState(null);
  
  function saveUserData(){
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
  }

  const routers = createBrowserRouter([
  {path:"", element: <Layout setUserData={setUserData} userData={userData}/>,children:[
    {path:"/", element: <Home />},
    {path:"home", element: <Home />},
    {path:"Happy-shop-e-commerce", element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path:"Categories", element: <ProtectedRoute><Categories /></ProtectedRoute>},
    {path:"Brands", element: <ProtectedRoute><Brands /></ProtectedRoute>},
    {path:"Cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},

    {path:"BrandProducts/:id", element: <ProtectedRoute><BrandProducts /></ProtectedRoute>},

    {path:"Checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute>},

    {path:"Productdetails/:id", element: <ProtectedRoute><Productdetails /></ProtectedRoute>},
    {path:"*", element: <Notfound />},

    {path:"login", element: <Login saveUserData={saveUserData}/>},
    {path:"register", element: <Register />},
  ]}
])

  return <CartContextProvider>
    <Offline><div className='network'>Only shown offline (surprise!)</div></Offline>
  <Toaster />
  <RouterProvider router={routers}></RouterProvider>
  </CartContextProvider>
  
}

export default App;
