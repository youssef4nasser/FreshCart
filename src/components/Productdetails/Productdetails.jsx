import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Productdetails.module.css";
import Slider from "react-slick";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function Productdetails() {
  let { addToCart, setnumbOfCartItems } = useContext(cartContext);

  async function addProdut(productId) {
    let response = await addToCart(productId);

    if (response?.data?.status === "success") {
      setnumbOfCartItems(response?.data?.numOfCartItems);
      toast.success(response.data.message, {
        duration: 2000,
        position: "bottom-right",
        className: "border-success border",
      });
    } else {
      toast.error("Error", { duration: 2000 });
    }
  }

  const [ProductDetails, setProductDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  let params = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductdetails(id) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getProductdetails(params.id);
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <div className="col-md-4">
                  <Slider {...settings}>
                    {ProductDetails?.images.map((img, i) => (
                      <img key={i} src={img} />
                    ))}
                  </Slider>
                </div>

                <div className="col-md-8">
                  <h3>{ProductDetails?.title}</h3>
                  <p className="my-4">{ProductDetails?.description}</p>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">
                      {ProductDetails?.price}EGP
                    </span>
                    <span>
                      <i className="fas fa-star rating-color">
                        {ProductDetails?.ratingsAverage}
                      </i>
                    </span>
                  </div>
                  <button
                    onClick={() => addProdut(ProductDetails._id)}
                    className="btn btn-add main-bg text-white w-100"
                  >
                    + Add
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
