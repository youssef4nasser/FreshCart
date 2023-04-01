
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
import './Register.module.css';

export default function Register() {
  const [isloading, setisloading]  = useState(false)

  const [messageError, setmessageError]  = useState("")

  let navigate = useNavigate();

  async function handleRegister(values){
    setisloading(true);
    let {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values).catch((error)=>{
      setisloading(false);
      setmessageError(`${error.response.data.errors.param} : ${error.response.data.errors.msg}`)
      console.log(error.response.data)
    })

    if(data.message === "success"){
      setisloading(false);
      navigate("/login");
    }
  }

  let validate = yup.object({
    name:yup.string().required("Name is required").min(3,"name minlenght is 3").max(10,"name maxlenght is 10"),
    email:yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must start with upercase"),
    rePassword: yup.string().required("rePassword is required").oneOf([yup.ref("password")], "Passwords must match"),
    phone:yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "phone must be valid number")
  })

let formik = useFormik({
  initialValues:{
  "name": "",
  "email":"",
  "password":"",
  "rePassword":"",
  "phone":""
  },
  validationSchema:validate,
  onSubmit: handleRegister,
  validateOnChange: true
})

  return <>
  <section className='py-5'>
    <div className="container">
      <form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
        <h3>Register Now : </h3>
        {messageError? <div className="alert alert-danger">{messageError}</div>: ""}
        

        <label htmlFor="name">Name: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name' />
       {formik.errors.name && formik.touched.name  ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

        <label htmlFor="email">Email: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="emai" name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}


        <label htmlFor="Password">Password: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}


        <label htmlFor="rePassword">rePassword: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="Password" name='rePassword' id='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}


        <label htmlFor="email">Phone: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
       {isloading ? <button type='butto' className='main-bg border-0 p-2 rounded-3 text-white'><i className='fas fa-spinner fa-spin'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='main-bg border-0 p-2 rounded-3 text-white'>Register</button>}

      </form>
    </div>
  </section>
  
  </>
}
