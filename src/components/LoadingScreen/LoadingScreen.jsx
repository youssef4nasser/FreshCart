import React from 'react'
import './LoadingScreen.module.css';

export default function LoadingScreen() {
  return <>
      <div className='text-center position-fixed top-0 start-0 end-0 w-100 h-100 bg-light d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x main-text'></i>
      </div>
  </>
}
