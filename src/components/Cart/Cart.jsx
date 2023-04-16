import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);

  const {getLoggedUserCart, removeItem, updateProductCount} = useContext(cartContext);

  async function getCart(){
    let response = await getLoggedUserCart();
    if(response?.data?.status === "success"){
      setcartDetails(response.data.data);
    }
  }

  async function deleteItem(productId){
    let response = await removeItem(productId);
    setcartDetails(response.data.data);
    toast("product removed");

  }

    async function updateProductQuantity(productId, count){
    let response = await updateProductCount(productId, count);
    setcartDetails(response.data.data);
    toast("product count UPdated");

  }

  useEffect(()=>{
    getCart();
  },[])

  return <>
  <section>
    <div className="container">
      {cartDetails? <div className='bg-light p-4 my-4'>
      <h3>shop cart :</h3>
      <h6 className='main-text'>Total cart price : {cartDetails.totalCartPrice} EGP</h6>
      {cartDetails.products.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2">
          <div className="col-md-1">
            <img src={product.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between">
            <div>
            <h6>{product.product.title}</h6>
            <h6 className='main-text'>{product.price} EGP</h6>
            <button onClick={()=>deleteItem(product.product._id)} className='btn m-0 btn-sm p-1 text-bg-danger' ><i className='fa-regular fa-trash-can'></i> Remove</button>
            </div>
            <div>
              <button onClick={()=>updateProductQuantity(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={()=>updateProductQuantity(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>
            </div>
          </div>
        </div>
      )}
      <button className='btn my-4 main-bg'>
        <Link className='text-white' to={"/checkout"}>
          checkout
        </Link>
      </button>
    </div> : null}

    </div>
  </section>

  
  </>
}
