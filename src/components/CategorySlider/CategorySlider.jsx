import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CategorySlider.module.css";
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };

  return (
    <>
      <div className="container">
        {/* <h2 className='h4'>Shop Popular Categories</h2> */}
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img className="w-100" height={250} src={category.image} />
              <h2 className="fs-6 fw-bold">{category.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
