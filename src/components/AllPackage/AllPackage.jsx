import React, { useEffect, useState } from 'react';
import { IoIosCart } from 'react-icons/io';
import Swal from 'sweetalert2';
import { userEmail } from '../../utils/userInfo';

const AllPackage = () => {
    let key = null;
    let email = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
      email = userEmail(key);
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/v1/product/get-all-package`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        });
    }, [email]);

    const handleAddToCart = (id) => {
      if (!key) {
        Swal.fire({
          title: "Success!",
          text: "Login First",
          icon: "success",
          confirmButtonText: "Cool!!!",
        });
        return;
      }
      console.log(id);
      const cartInfo = {
        email: email,
        productId: id,
      };
      console.log(cartInfo);
      fetch("http://localhost:5000/api/v1/cart/addToCart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartInfo),
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          if (data.result) {
            Swal.fire({
              title: "Success!",
              text: "Cart Added Successfully",
              icon: "success",
              confirmButtonText: "OK!!!",
            });
          }
        })
      );
    };
    return (
      <div>
        <div>
          <h2 className="text-4xl font-bold text-center py-10">All Products</h2>
        </div>
        <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
          {products?.data?.map((product) => (
            <div key={product._id} className="caard">
              <div className="face front">
                <img src={product.image} alt="" />
                <h3>{product.name}</h3>
              </div>

              <div className="face back">
                <p className="text-2xl font-bold">{product?.name}</p>
                <div className="text-start mx-[20px] space-y-3">
                  {product.category && (
                    <h4 className="text-xl font-serif">
                      Product Type: {product?.category}
                    </h4>
                  )}
                  <h4 className="text-xl font-serif">
                    Product Price: ৳{" "}
                    <span
                      className={`${
                        email ? "font-light text-slate-200" : ""
                      }`}
                    >
                      {product.price}
                    </span>{" "}
                  </h4>
                  <h4 className="text-xl font-serif">
                    Product Details: {product.description}{" "}
                  </h4>
                </div>
                <div className="">
                  <div className="flex justify-end link">
                    <h4
                      onClick={() => handleAddToCart(product._id)}
                      className="btn bg-transparent border-none"
                    >
                      <IoIosCart className="text-xl text-white"></IoIosCart>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllPackage;