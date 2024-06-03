import { useEffect, useState } from "react";
import { userEmail } from "../../utils/userInfo";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { IoIosCart } from "react-icons/io";
import UseLoader from '../../utils/UseLoader';

const CartItem = () => {
    let key = null;
    let email = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
      email = userEmail(key);
    }
    console.log(email);

    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        fetch(
            `http://localhost:5000/api/v1/cart/addToCart/${email}`
        )
            .then((res) => res.json())
            .then((data) => {
              console.log(data?.data);
              setShow(false);
              setProducts(data);
                // setRecords(data);
            });
    }, [email])
    const navigate = useNavigate();
    
    const handleCheckboxChange = (item) => {
      console.log(item);
      let newItem = [];
      const exists = selectedItems.find(selectItem => selectItem.productId == item._id);
      console.log(exists);
      if (!exists) {
        newItem = [...selectedItems, item];
      } else {
        const remaining = selectedItems.filter(selectItem => selectItem.productId != item._id);
        newItem = [...remaining];
      }
      console.log(newItem);
      setSelectedItems(newItem);
  };

    const handleOrder = () => {
      let data = [];
      for (let i = 0; i < selectedItems.length; i++){
        let obj = {
          productId: selectedItems[i].productId,
          packageProductId: selectedItems[i].data.productId,
          discount: selectedItems[i].discount,
          quantity: selectedItems[i].quantity,
        };
        data.push(obj)
      }
      const orderData = {
          email: email,
          data: data,
          totalPrice: products?.totalPrice
      }
      console.log(orderData);
      fetch(" http://localhost:5000/api/v1/order/create-order", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            Swal.fire({
              title: "Success!",
              text: "Order Placed Successfully",
              icon: "success",
              confirmButtonText: "OK!!!",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          }
        });
    }
    
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
            }).then(result => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        })
      );
    };

    return (
      <div>
        {show && (
          <div>
            <UseLoader></UseLoader>
          </div>
        )}
        {!show && (
          <div>
            <h2 className="text-4xl font-bold text-center py-10">My Cart</h2>
          </div>
        )}
        {!show && (
          <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
            {products?.data?.map((product) => (
              <div key={product._id} className="caard">
                <div className="flex justify-start pb-5">
                  <input type="checkbox" name="check" id="check" onChange={()=>handleCheckboxChange(product)}/>
                </div>
                <div className="face front">
                  <img src={product.image} alt="" />
                  <h3>{product.name}</h3>
                </div>

                <div className="face back">
                  <p className="text-2xl font-bold">{product.name}</p>
                  <div className="text-start mx-[20px] space-y-3">
                    <h4 className="text-xl font-serif">
                      Quantity: {product.quantity}
                    </h4>
                    <h4 className="text-xl font-serif">
                      Original Price: {product.price}
                    </h4>
                    {product.discount != product.price && (
                      <h4 className="text-xl font-serif">
                        Discount Price: {product.discount}
                      </h4>
                    )}
                    <h4 className="text-xl font-serif">
                      Product Type: {product.isType}
                    </h4>
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between link"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!show && (
          <div className="border border-black rounded-sm p-2 mx-10 mt-10">
            <p className="text-xl font-bold">
              Total Price: <span>{products?.totalPrice}</span>{" "}
            </p>
          </div>
        )}

        {!show && (
          <div className="flex justify-end">
            <button
              onClick={handleOrder}
              className="my-5 flex justify-end btn btn-warning px-10"
            >
              Checkout
            </button>
          </div>
        )}
        {!show && (
          <div className="mt-5">
            <div className="text-left font-bold text-4xl">Excited Offer</div>
            <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
              {products?.suggestion?.map((product) => (
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
        )}
      </div>
    );
};

export default CartItem;