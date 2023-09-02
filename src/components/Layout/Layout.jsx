import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.module.css';

export default function Layout({setUserData, userData}) {

  let navigate = useNavigate();

  function LogOut(){
    localStorage.removeItem("userToken");
    setUserData(null)
    navigate("/login")
  }

  return <>
  <Navbar LogOut={LogOut} userData={userData}/>
  <Outlet></Outlet>
  <Footer />
  
  </>
}
