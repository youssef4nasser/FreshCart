import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
import './Login.module.css';

export default function Login({saveUserData}) {
  const [isloading, setisloading]  = useState(false)

  const [messageError, setmessageError]  = useState("")

  let navigate = useNavigate();

  async function handleLogin(values){
    setisloading(true);
    let {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values).catch((error)=>{
      setisloading(false);
      setmessageError(`${error.response.data.errors.param} : ${error.response.data.errors.msg}`)
    })

    if(data.message === "success"){
      localStorage.setItem("userToken", data.token)
      saveUserData();
      setisloading(false);
      navigate("/");
    }
  }

  let validate = yup.object({
    email:yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must start with upercase"),

  })

let formik = useFormik({
  initialValues:{
  "email":"",
  "password":"",
  },
  validationSchema:validate,
  onSubmit: handleLogin,
  validateOnChange: true
})

  return <>
  <section className='py-5'>
    <div className="container">
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
        <h3>Login Now : </h3>
        {messageError? <div className="alert alert-danger">{messageError}</div>: ""}
        
        <label htmlFor="email">Email: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="emai" name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}


        <label htmlFor="Password">Password: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
       {isloading ? <button type='butto' className='main-bg border-0 p-2 rounded-3 text-white'><i className='fas fa-spinner fa-spin'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='main-bg border-0 p-2 rounded-3 text-white'>Login</button>}

      </form>
    </div>
  </section>
  
  </>
}
