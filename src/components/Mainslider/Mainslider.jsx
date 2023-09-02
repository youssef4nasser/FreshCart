import styles from './Mainslider.module.css';
import React, { Component } from "react";
import Slider from "react-slick";
import sliderImg1 from '../../assets/slider-2.jpeg'
import sliderImg2 from '../../assets/grocery-banner-2.jpeg'
import sliderImg3 from '../../assets/grocery-banner.png'

export default function Mainslider () {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <>
    <div className='container'>
        <Slider {...settings}>
          <div>
            <img className='w-100' src={sliderImg1} alt="" />
          </div>
          <div>
          <img className='w-100' src={sliderImg2} alt="" />
          </div>
          <div>
          <img className='w-100' src={sliderImg3} alt="" />
          </div>
        </Slider>
      </div>
  </>
}
