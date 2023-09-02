import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import { Offline } from "react-detect-offline";
import BrandProducts from './components/BrandProducts/BrandProducts';
import Wishlist from './components/Wishlist/Wishlist';
import Orders from './components/orders/orders';
import Products from './components/Products/Products.jsx';
import { WishlistContextProvider } from './Context/wishlistContext.js';

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
    {index: true, element: <Home />},
    {path:"FreshCart", element: <Home />},
    {path:"Categories", element: <Categories />},
    {path:"Brands", element: <Brands />},
    {path:"products", element: <Products />},
    {path:"Cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path:"Wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute>},
    {path:"orders", element: <ProtectedRoute><Orders userData={userData} /></ProtectedRoute>},

    {path:"BrandProducts/:filterId/:id", element: <BrandProducts />},

    {path:"Checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute>},

    {path:"Productdetails/:id", element: <Productdetails />},
    {path:"*", element: <Notfound />},

    {path:"login", element: <Login saveUserData={saveUserData}/>},
    {path:"register", element: <Register />},
  ]}
])

  return <CartContextProvider>
    <Offline><div className='network'>Only shown offline (surprise!)</div></Offline>
    <Toaster />
    <WishlistContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </WishlistContextProvider> 
  </CartContextProvider>
  
}

export default App;
