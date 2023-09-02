import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import style from './FeatureProducts.module.css';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { wishlistContext } from '../../Context/wishlistContext.js';

export default function FeatureProducts() {
  let {addToCart, setnumbOfCartItems} = useContext(cartContext);
  let {addToWishlist} = useContext(wishlistContext);

    async function addProdut(productId){
    let response = await addToCart(productId);
    console.log(response.data)

    if(response?.data?.status === "success"){
      setnumbOfCartItems(response?.data?.numOfCartItems);
      toast.success(response.data.message, {duration:2000, position:"bottom-right", className:"border-success border"})
    }
    else{
      toast.error("Error", {duration:2000});
    }
  }

  async function addWishList(productId){
    let response = await addToWishlist(productId);
    if(response?.data?.status === "success"){
      // setnumbOfWishlistItems(response?.data?.numOfCartItems);
      toast.success(response.data.message, {duration:2000, position:"bottom-right", className:"border-success border"})
    }
    // else{
    //   toast.error("Error when to add product in Wishlist", {duration:2000});
    // }
  }

  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function getProducts() {
    setisLoading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
    setProducts(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return  <>
    <section className='py-5'>
      <div className="container">
        <div className="row g-4">
          {isLoading?<LoadingScreen />:
          <>
          {products.map(product => (
          <div  key={product._id} className="col-md-3">
            <div className='product-item h-100 p-3'>
              <Link to={`ProductDetails/${product._id}`}> 
                <img className='w-100' src={product.imageCover} alt={product.title} />
                <span className='main-text'>{product.category.name}</span>
                <h2 className='text-black fw-bold pt-2 fs-6'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
                <div className='d-flex pb-2 justify-content-between'>
                  <span className='text-black-50'>{product.price}EGP</span>
                  <span>
                    <i className='fas fa-star rating-color'>
                      {product.ratingsAverage}
                    </i>
                  </span>
                </div>
              </Link>
              <div className="d-flex justify-content-between">
                <button onClick={()=>addWishList(product._id)} type="submit" className="btn border-main mt-auto w-7"><i class="fa-regular fa-heart"></i></button>
                <button onClick={()=>addProdut(product._id)} className='btn border-main w-75 mt-auto'>Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
              </div>
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
