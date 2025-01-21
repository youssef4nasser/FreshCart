import React, { useContext, useEffect, useState } from "react";
import "./BrandProducts.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import iconNoProducts from "../../assets/Icon-no-products.png";

export default function BrandProducts() {
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

  const [allProducts, setallProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { id, filterId } = useParams();

  async function getBrandProducts() {
    console.log(filterId);
    setisLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        params: { [filterId]: id },
      }
    );
    setallProducts(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getBrandProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="py-5">
          <div className="container">
            <div className="row">
              {allProducts.length == 0 ? (
                <img
                  src={iconNoProducts}
                  alt="No Products Available right Now..."
                />
              ) : (
                allProducts.map((product, i) => {
                  return (
                    <div key={product._id} className="col-md-3">
                      <div className="product-item">
                        <i className="fa-regular fa-heart"></i>
                        <Link to={`/ProductDetails/${product._id}`}>
                          <img
                            className="w-100"
                            src={product.imageCover}
                            alt={product.title}
                          />
                          <span className="main-text fw-bold">
                            {product.category.name}
                          </span>
                          <h3 className="h-6 fw-bold py-3">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">
                              {product.price}EGP
                            </span>
                            <span>
                              <i className="fas fa-star rating-color">
                                {product.ratingsAverage}
                              </i>
                            </span>
                          </div>
                        </Link>
                        <button
                          onClick={() => addProdut(product._id)}
                          className="btn btn-add main-bg text-white w-100"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
