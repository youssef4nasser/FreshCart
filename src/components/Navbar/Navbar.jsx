import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import logo from "../../assets/freshcart-logo.svg"
import { cartContext } from '../../Context/CartContext';


export default function Navbar({userData, LogOut}) {
  let {numOfCartItems} = useContext(cartContext);
  return <>
  <nav className="navbar navbar-expand-lg bg-light">
  <div className="container">
    <Link className="navbar-brand nav-logo" to={"/"}><img width={130} src={logo} alt="logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
        {userData === null ? <>
        <li className="nav-item">
          <Link className="nav-link" to={"/Login"}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/Register"}>Register</Link>
        </li>
        </>: <>
        <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span>Hello Youssef</span> <i className="fa-solid fa-user fa-lg"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to={"/"}>Sitting account</Link></li>

              <li><Link className="dropdown-item" to={"/"}>Orders</Link></li>

              <li><Link className="dropdown-item" to={"/Wishlist"}>wishlist</Link></li>

              <li><span onClick={LogOut} className='cursor-pointer nav-link'>Logout</span></li>
            </ul>
          </div>

          <li className="nav-item position-relative">
          <Link className="nav-link" to={"/Cart"}>
            <i className='fas fa-shopping-cart fa-lg'></i>
          <span className='badge main-bg text-white position-absolute top-0 end-0'>{numOfCartItems}</span>
          </Link>
        </li>

        </>}
      </ul>
    </div>
  </div>
</nav>
  </>
}