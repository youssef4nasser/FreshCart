import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './CategorySlider.module.css';
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

    async function getCategories() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  return <>
    <Slider {...settings}>
      {categories.map((category)=> <div key={category._id}>
            <img className='w-100' height={250} src={category.image} />
            <h2 className='fs-4'>{category.name}</h2>
        </div>)}
    </Slider>
  </>
}
