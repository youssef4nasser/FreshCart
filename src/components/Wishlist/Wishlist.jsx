import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { wishlistContext } from '../../Context/wishlistContext.js';

export default function WishList() {
  const [wishlistDetails, setwishlistDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const {getloggedUserWishlist} = useContext(wishlistContext);

  async function getwishList(){
    setisLoading(true)
    let response = await getloggedUserWishlist();
    if(response.data.status === "success"){
      setwishlistDetails(response.data.data);
      setisLoading(false)
      console.log(response)
    }
  }

  useEffect(()=>{
    getwishList();
  },[])

  return <>
  {isLoading? <LoadingScreen /> : <section>
    <div className="container">
    <h3>Wishlist :</h3>
    {wishlistDetails.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2">
          <div className="col-md-1">
            <img src={product.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between">
            <div>
            <h6>{product.product.title}</h6>
            <h6 className='main-text'>{product.price} EGP</h6>
            {/* <button onClick={()=>deleteItem(product.product._id)} className='btn m-0 btn-sm p-1 text-bg-danger'><i className='fa-regular fa-trash-can'></i> Remove</button> */}
            </div>
            {/* <div>
              <button onClick={()=>updateProductQuantity(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={()=>updateProductQuantity(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>
            </div> */}
          </div>
        </div>
      )}

    </div>
  </section>}

  </>
}
