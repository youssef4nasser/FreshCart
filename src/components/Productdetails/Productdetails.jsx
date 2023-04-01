import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Productdetails.module.css';
import Slider from "react-slick";

export default function Productdetails() {
  const [ProductDetails,setProductDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let params = useParams();

      const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  async function getProductdetails(id){
    setisLoading(true)
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    setisLoading(false)
  }

  useEffect(()=>{
    getProductdetails(params.id)
    console.log(params.id)
  },[])

  return <>
  <section>
      <div className="container">
        <div className="row align-items-center justify-content-center">

          {isLoading?
           <div className='text-center position-fixed top-0 start-0 end-0 w-100 h-100 bg-light d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fa-3x main-text'></i></div>: <>
          
          <div className="col-md-4">
          <Slider {...settings}>
            {ProductDetails?.images.map((img)=> <img src={img} /> )}
          </Slider>
          </div>
          <div className="col-md-8">
          <h3>{ProductDetails?.title}</h3>
          <p className='my-4'>{ProductDetails?.description}</p>
          <div className='d-flex justify-content-between'>
            <span className='text-muted'>{ProductDetails?.price}EGP</span>
            <span>
              <i className='fas fa-star rating-color'>
                {ProductDetails?.ratingsAverage}
              </i>
            </span>
          </div>
          <button className='btn btn-add main-bg text-white w-100'>+ Add</button>
          </div>
          
          </>}

        </div>
      </div>
    </section>
  </>
}
