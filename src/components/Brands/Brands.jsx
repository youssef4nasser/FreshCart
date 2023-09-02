import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';

export default function Brands() {

  const [brands, setbrands] = useState([]);
  const [isLoading, setisLoading] = useState(false);


  async function allBrands(){
    setisLoading(true);
    let {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/brands")
    setbrands(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    
    allBrands();

  }, [])
  

  return <>
  {isLoading?<LoadingScreen /> : <section className='py-5'>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-3">
          <h2 className='h1 main-text'>Our Brands</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium?</p>
        </div>
        {brands.map((brand)=>{ return <div key={brand._id} className="col-md-3">
          <Link to={`/BrandProducts/brand/${brand._id}`}>
            <img src={brand.image} alt="" />
            <h6 className='text-center'>{brand.name}</h6>
          </Link>
      </div>
        })}
      </div>
    </div>
  </section>}

  </>
}
