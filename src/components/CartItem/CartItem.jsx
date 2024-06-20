import { useEffect, useState } from "react";
import { userEmail } from "../../utils/userInfo";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import UseLoader from '../../utils/UseLoader';

const CartItem = () => {
  let key = null;
  let email = null;
  let p = 0;
  if (localStorage.getItem("key")) {
    key = localStorage.getItem("key");
    email = userEmail(key);
    p = localStorage.getItem("price");
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
            console.log(data);
            setShow(false);
            setProducts(data);
              // setRecords(data);
          });
  }, [email])
  const navigate = useNavigate();

  const handleCheckboxChange = (item) => {
    let newItem = [];
    const exists = selectedItems.find(
      (selectItem) => selectItem.productId == item.productId
    );
    if (!exists) {
      newItem = [...selectedItems, item];
    } else {
      const remaining = selectedItems.filter(
        (selectItem) => selectItem.productId != item.productId
      );
      newItem = [...remaining];
    }
    setSelectedItems(newItem);
  };

  function findItem(id) {
    const item = selectedItems.find((item) => item.productId == id);
    if (item) return true;
    else return false;
  }

    const handleOrder = () => {
      let data = [];
      let totalPrice = 0;
      console.log(selectedItems);
      for (let i = 0; i < selectedItems.length; i++){
        totalPrice = totalPrice + selectedItems[i].discount * selectedItems[i].quantity;
        let obj = {
          productId: selectedItems[i].productId,
          discount: selectedItems[i].discount,
          quantity: selectedItems[i].quantity,
        };
        data.push(obj)
      }
      const orderData = {
          email: email,
          data: data,
          totalPrice: totalPrice
      }
      console.log(orderData);
      fetch("http://localhost:5000/api/v1/order/create-order", {
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
    
    const handleAddCart = (product) => {
      localStorage.removeItem("price");
      localStorage.setItem("price", 0);
      p = localStorage.getItem("price");
      console.log(product);
      const cartInfo = {
        email: email,
        productId: product.productId,
      };
      console.log(cartInfo);
      let i;
      for (i = 0; i < product.getProduct; i++){
        p = p + product?.price;
        localStorage.setItem("price", p);
        fetch("http://localhost:5000/api/v1/cart/addToCart", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cartInfo),
        }).then((res) =>
          res.json().then((data) => {
            console.log(data);
          })
        );
      }
      if (i == product.getProduct) {
        fetch(
          `http://localhost:5000/api/v1/cart/addToCart/update-package/${product._id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              productId: product.productId,
            }),
          }
        ).then((res) =>
          res.json().then((data) => {
            if (data.result) {
              Swal.fire({
                title: "Success!",
                text: "Cart Added Successfully",
                icon: "success",
                confirmButtonText: "OK!!!",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          })
        );
      }
    };
    
    const handleRemoveFromCart = (id) => {
      console.log(id);
      fetch(`http://localhost:5000/api/v1/cart/delete-cart/${email}/${id}`, {
        method: "DELETE",
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          if (data.result) {
            Swal.fire({
              title: "Success!",
              text: "Remove Product Successfully",
              icon: "success",
              confirmButtonText: "OK!!!",
            }).then((result) => {
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
        {/* cart data */}
        {!show && (
          <div className="col-span-2 overflow-x-auto mr-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products?.data?.map((item) => (
                  <tr key={item.productId}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          checked={findItem(item.productId)}
                          onChange={() => handleCheckboxChange(item)}
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>৳ {item.price}</td>
                    <td>{item.category}</td>
                    <td className="flex gap-5 items-center">
                      <div
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="text-xl btn"
                      >
                        -
                      </div>
                      <div>{item.quantity}</div>
                      <div
                        onClick={() => handleAddToCart(item.productId)}
                        className="text-xl btn"
                      >
                        +
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!show && (
          <div className="border border-black rounded-sm p-2 mx-10 mt-10">
            <p className="text-xl font-bold">
              Total Price:{" "}
              <span>{products?.totalPrice - p}</span>{" "}
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
        {/* suggestion */}
        {!show && (
          <div className="mt-5">
            <div className="text-left font-bold text-4xl">Excited Offer</div>
            <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
              {products?.suggestion?.map((product) => (
                <div key={product._id} className="caard">
                  <div className="face front">
                    <img src={product.image} alt="" />
                    <h3>
                      Buy {product?.buyProduct} Get {product?.getProduct}
                    </h3>
                  </div>

                  <div className="face back">
                    <p className="text-2xl font-bold">
                      Buy {product?.buyProduct} Get {product?.getProduct}
                    </p>
                    <div className="">
                      <div className="flex justify-end link">
                        <h4
                          onClick={() => handleAddCart(product)}
                          className="btn bg-transparent border-none"
                        >
                          ADD
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