import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.module.css';

export default function Layout({userData, setUserData}) {

  let navigate = useNavigate();

  function LogOut(){
    localStorage.removeItem("userToken");
    setUserData(null)
    navigate("/login")
  }


  return <>
  <Navbar LogOut={LogOut} suserData={userData}/>
  <Outlet></Outlet>
  <Footer />
  
  </>
}
