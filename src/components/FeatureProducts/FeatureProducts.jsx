import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeatureProducts.module.css';
import { Link } from 'react-router-dom';

export default function FeatureProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);


  async function getProducts() {
    setisLoading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
    setProducts(data.data);
    setisLoading(false)
  }

  useEffect(() => {
    getProducts();
  }, [])

  return  <>
    <section className='py-5'>
      <div className="container">
        <div className="row">
          {isLoading?<div className='text-center position-fixed top-0 start-0 end-0 w-100 h-100 bg-light d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fa-3x main-text'></i></div>:
          <>
          {products.map(product => (
          <div  key={product._id} className="col-md-3">
            <div className='product-item cursor-pointer'>
              <Link to={`ProductDetails/${product._id}`}> 
                <img className='w-100'  src={product.imageCover} alt={product.title} />
                <span className='main-text fw-bold'>{product.category.name}</span>
                <h3 className='h-6 fw-bold py-3'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                <div className='d-flex justify-content-between'>
                  <span className='text-muted'>{product.price}EGP</span>
                  <span>
                    <i className='fas fa-star rating-color'>
                      {product.ratingsAverage}
                    </i>
                  </span>
                </div>
                <button className='btn btn-add main-bg text-white w-100'>+ Add</button>
              </Link>
            </div>
          </div>
        ))}
          </>
          
          }

        </div>
      </div>
    </section>
  </>
}
