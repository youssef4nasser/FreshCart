import React, { useEffect, useState } from "react";
import "./orders.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";

export default function Orders({ userData }) {
  const [allOrders, setAllOrders] = useState(null);

  useEffect(() => {
    async function getAllOrders() {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
      );
      setAllOrders(data);
    }
    getAllOrders();
  }, [userData.id]);

  return (
    <>
      {allOrders ? (
        <section className="py-5">
          <div className="container">
            <h2>Your Orders</h2>
            <div className="row">
              {allOrders &&
                allOrders.map((order, i) => (
                  <div key={i} className="col-md-12">
                    <div className="order p-4 bg-white rounded shadow-sm mb-5">
                      <div className="order-info bg-light p-2 d-flex justify-content-between">
                        <div>
                          <span className="text-black-50">createdAt</span>
                          <p className="fw-bold">{order.createdAt}</p>
                        </div>
                        <div>
                          <span className="text-black-50">isDelivered</span>
                          <p className="fw-bold">
                            {order.isDelivered ? "yes" : "no"}
                          </p>
                        </div>
                        <div>
                          <span className="text-black-50">isPaid</span>
                          <p className="fw-bold">
                            {order.isPaid ? "yes" : "no"}
                          </p>
                        </div>
                        <div>
                          <span className="text-black-50">
                            paymentMethodType
                          </span>
                          <p className="fw-bold">{order.paymentMethodType}</p>
                        </div>
                      </div>
                      <div className="order-items">
                        {order.cartItems.map((item) => (
                          <div className="item-info d-flex">
                            <img
                              className=""
                              width={150}
                              src={item.product.imageCover}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
