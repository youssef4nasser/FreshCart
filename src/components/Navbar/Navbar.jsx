import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import logo from "../../assets/logo2.webp"

export default function Navbar({suserData, LogOut}) {
  return <>
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand nav-logo" to={"/"}><img width={100} src={logo} alt="logo" /></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {suserData !== null ? <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link main-text" to={"/"}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/Products"}>Products</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/Categories"}>Categories</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/Cart"}>Cart</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/Brands"}>Brands</Link>
        </li>
      </ul>:null}


      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item d-flex align-items-center">
          <i className='fab mx-2 fa-facebook'></i>
          <i className='fab mx-2 fa-twitter'></i>
          <i className='fab mx-2 fa-instagram'></i>
          <i className='fab mx-2 fa-tiktok'></i>
          <i className='fab mx-2 fa-linkedin'></i>
          <i className='fab mx-2 fa-youtube'></i>
        </li>
        {suserData === null ? <>
        <li class="nav-item">
          <Link class="nav-link" to={"/Login"}>Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={"/Register"}>Register</Link>
        </li>
        </>: <li class="nav-item">
          <span onClick={LogOut} className='cursor-pointer nav-link'>Logout</span>
        </li>}
      </ul>
    </div>
  </div>
</nav>
  </>
}