import { useEffect, useState } from "react";
import { userEmail } from "../../utils/userInfo";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



const CartItem = () => {
    const email = userEmail(localStorage.getItem("key"));
    console.log(email);

    const [products, setProducts] = useState([]);
    // const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:5000/api/v1/cart/addToCart/${email}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
                // setRecords(data);
            });
    }, [email])
    const navigate = useNavigate();

    const handleOrder = () => {
        const orderData = {
            email: email,
            data: products?.data,
            totalPrice: products?.totalPrice
        }
        fetch(" http://localhost:5000/api/v1/order/create-order", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(orderData),
        })
          .then((res) => res.json())
          .then((data) => {
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

    return (
      <div>
        <div>
          <h2 className="text-4xl font-bold text-center py-10">My Cart</h2>
        </div>
        <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
          {products?.data?.map((product) => (
            <div key={product._id} className="caard">
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
                    Price: {product.price}{" "}
                  </h4>
                  <h4 className="text-xl font-serif">
                    Discount: {product.discount}{" "}
                  </h4>
                </div>
                <div className="">
                  <div className="flex items-center justify-between link"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-black rounded-sm p-2 mx-10">
          <p className="text-xl font-bold">
            Total Price: <span>{products?.totalPrice}</span>{" "}
          </p>
        </div>

        <div className="flex justify-end">
          <button onClick={handleOrder} className="my-5 flex justify-end btn btn-warning px-10">
            Checkout
          </button>
        </div>
      </div>
    );
};

export default CartItem;