import React from 'react'
import './Footer.module.css';

import americanExpress from "../../assets/02.png"
import mastercardicon from "../../assets/05.png"
import viza from "../../assets/06.png"

import appStore from "../../assets/app-store.svg"

import playStore from "../../assets/google-play.svg"

export default function Footer() {
  return (
    <footer className='bg-light py-5'>
      <div className="container">
        <h3>Get the FreshCart app</h3>
        <p>We will send you a link, open it on your phone to download the app.</p>
        <div className="row">
          <div className="col-12">
            <div className="footer-input d-flex justify-content-between">
              <input type="email" className="form-control w-75" id="exampleFormControlInput1" placeholder="Email"/>
              <button className='btn main-bg text-white'>Share App Link</button>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-between border-bottom border-top mt-4 py-4">
            <div className="payment d-flex align-items-center">
              <h3 className='fs-6'>Payment Partners</h3>
              <div>
              <img className='px-2' width={100} src={americanExpress} alt="" />
              <img className='px-2' width={100} src={viza} alt="" />
              <img className='px-2' width={100} src={mastercardicon} alt="" />
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className='fs-6'>Get deliveries with FreshCart</h3>
              <div className='d-flex justify-content-between'>
              <div className='footer-app mx-2'>
              <img className='px-2' src={appStore}  width={150} alt="" />
              </div>
              <div className='footer-app ms-2'>
              <img className='px-2' src={playStore}  width={150} alt="" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
