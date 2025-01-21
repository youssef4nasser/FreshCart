import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function allCategories() {
    setisLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    allCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3">
                <h2 className="h1 main-text">Our Categories</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Accusantium?
                </p>
              </div>
              {Categories.map((Category) => {
                return (
                  <div key={Category._id} className="col-md-3">
                    <Link to={`/BrandProducts/category/${Category._id}`}>
                      <img
                        width={300}
                        height={350}
                        src={Category.image}
                        alt=""
                      />
                      <h6 className="text-center">{Category.name}</h6>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
