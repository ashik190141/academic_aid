import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { dateFormatter } from '../../utils/dateFormatter';
import UseLoader from '../../utils/UseLoader';
import { userEmail } from '../../utils/userInfo';

const ReturnOrderModal = ({ orderId, closeModal, orderDataId }) => {
    // console.log(productId, orderDataId);
    let key = null;
    let email = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
      email = userEmail(key);
    }
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    // console.log(email);

    const [productInfo, setProductInfo] = useState();
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [packageQuantity, setPackageQuantity] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/order/get-product-info/${orderId}/${orderDataId}/${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShow(false);
        setProductInfo(data.data);
        setQuantity(data.data.quantity);
        setPackageQuantity(data.data.packageQuantity);
        setTotalPrice(
          data.data.totalPrice -
            data?.data?.price * data?.data?.packageQuantity
        );
      });
  }, [orderId, orderDataId, email]);
    
    const handleReturn = () => {
        let obj = {
          quantity: quantity,
          return: productInfo?.quantity - quantity,
          totalPrice: totalPrice,
        };
        console.log(obj);
        fetch(
          `http://localhost:5000/api/v1/order/order-return/${orderId}/${orderDataId}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.result) {
              Swal.fire({
                title: "Success!",
                text: "Product Return Successful",
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
    
    const handleChange = (e) => {
        const minusAmount =productInfo?.packageQuantity -  (parseInt(parseInt(e.target.value) / parseInt(productInfo?.buy)) + 1)
        console.log(minusAmount);
        if(minusAmount<0){
          setPackageQuantity(0);
        }
        else {
          setPackageQuantity(minusAmount);
        }

        // const y = parseInt(productInfo?.totalGet);
        // const z = parseInt(e.target.value);
        // const x = parseInt(y - z);
        // const p = parseInt(productInfo?.quantity)
        // console.log(parseInt(y/x));

        // const countQuantity = parseInt(p - parseInt(y / x));
        // console.log(countQuantity);
      
        let p = parseInt(
          productInfo?.totalPrice -
            productInfo?.price * productInfo?.packageQuantity
        );
          console.log(p);

        if (parseInt(e.target.value) == 0 || e.target.value == '') {
          setQuantity(productInfo?.quantity);
          setTotalPrice(p);
          setPackageQuantity(productInfo?.packageQuantity);
        } else {
          setQuantity(productInfo?.quantity - (parseInt(e.target.value) +(productInfo?.get)));   
          setTotalPrice(
            totalPrice -
              parseInt(e.target.value) * productInfo?.price
          );
        }

        // if (countQuantity<0) {
        //   setQuantity(0);
        // } else {
        //     setQuantity(countQuantity);
        // }
    }
    
  return (
    <div className="w-[500px] py-5">
      {!show ? (
        <div className="flex justify-around">
          <figure>
            <img src={productInfo?.image} alt="" />
          </figure>
          <div className="mt-2">
            <div>{productInfo?.name}</div>
            <div className="flex justify-between">
              <div className="text-xl">{productInfo?.category}</div>
              <div className="text-xl">{productInfo?.price}</div>
            </div>
            <div className="text-xl">
              Quantity: <span id="updateQuantity">{quantity}</span>
            </div>
            {/* <div className="text-xl">Total Get: <span id="updateTotalGet">{totalGet}</span></div> */}
            <div className="text-xl my-1">
              Package Quantity:{" "}
              <span id="updateTotalPrice">{packageQuantity}</span>
            </div>
            <div className="text-xl my-1">
              Total Price: <span id="updateTotalPrice">{totalPrice}</span>
            </div>
            <div className="text-xl my-1">
              Order Date: {dateFormatter(productInfo?.orderDate)}
            </div>
            <div className="mt-8">
              <div className="relative w-max">
                <input
                  className="peer h-[50px] border-b border-[#1B8EF8] bg-blue-100 px-2 pt-4 text-[#1B8EF8] focus:outline-none dark:bg-blue-500/20"
                  type="number"
                  id="return"
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
                <label
                  className="absolute left-2 top-0.5 text-xs text-[#1B8EF8] duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#1B8EF8]"
                  htmlFor="navigate_ui_input_55"
                >
                  Return Amount
                </label>
              </div>
              <div className="flex justify-end mt-3">
                <button onClick={handleReturn} className="btn btn-warning">
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UseLoader></UseLoader>
      )}
    </div>
  );
};

export default ReturnOrderModal;