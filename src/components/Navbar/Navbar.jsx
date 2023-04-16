import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import logo from "../../assets/logo2.webp"
import { cartContext } from '../../Context/CartContext';


export default function Navbar({suserData, LogOut}) {
  let {numOfCartItems} = useContext(cartContext);
  return <>
  <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand nav-logo" to={"/"}><img width={100} src={logo} alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {suserData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link main-text" to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Categories"}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Brands"}>Brands</Link>
        </li>
      </ul>:null}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className='fab mx-2 fa-facebook'></i>
          <i className='fab mx-2 fa-twitter'></i>
          <i className='fab mx-2 fa-instagram'></i>
          <i className='fab mx-2 fa-tiktok'></i>
          <i className='fab mx-2 fa-linkedin'></i>
          <i className='fab mx-2 fa-youtube'></i>
        </li>
        {suserData === null ? <>
        <li className="nav-item">
          <Link className="nav-link" to={"/Login"}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Register"}>Register</Link>
        </li>
        </>:
        <>
        <li className="nav-item position-relative">
          <Link className="nav-link" to={"/Cart"}>
            <i className='fas fa-shopping-cart fa-lg'></i>
          <span className='badge main-bg text-white position-absolute top-0 end-0'>{numOfCartItems}</span>
          </Link>
        </li>
        <li className="nav-item">
          <span onClick={LogOut} className='cursor-pointer nav-link'>Logout</span>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
  </>
}