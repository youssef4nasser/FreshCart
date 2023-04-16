import React, { useContext } from 'react'
import './Checkout.module.css';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';

export default function Checkout() {
  let {onlinePayment, cartId} = useContext(cartContext);

  async function handleSubmit(values){
    let response = await onlinePayment(cartId, values)
    console.log(response)
    console.log(values);
    if(response.data.status === "success"){
      window.location.href = response.data.session.url
    }

  }

  let formik = useFormik({
    initialValues:{
      details:"",
      city:"",
      phone:""
    },
    onSubmit: handleSubmit
  })

  return <>

  <section>
    <div className="container">
      <div className='w-50 py-5 mx-auto'>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details :</label>
          <input type="text" className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} name='details' id='details'/>

          <label htmlFor="phone">phone :</label>
          <input type="tel" className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone'/>


          <label htmlFor="city">city :</label>
          <input type="text" className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} name='city' id='city'/>
          <button type='submit' className='btn border-main w-100'>Pay</button>
        </form>
      </div>
    </div>
  </section>
      
  </>
}
