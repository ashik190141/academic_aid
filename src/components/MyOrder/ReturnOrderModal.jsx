import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { dateFormatter } from '../../utils/dateFormatter';
import UseLoader from '../../utils/UseLoader';
import { userEmail } from '../../utils/userInfo';

const ReturnOrderModal = ({ productId, closeModal, orderDataId }) => {
    // console.log(productId, orderDataId);
    let key = null;
    let email = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
      email = userEmail(key);
    }
    const [show, setShow] = useState(true);
    // console.log(email);

    const [productInfo, setProductInfo] = useState();
    const [quantity, setQuantity] = useState(0);
    const [totalGet, setTotalGet] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/order/get-product-info/${productId}/${orderDataId}/${email}`
    )
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
            setShow(false);
            setProductInfo(data.data);
            setQuantity(data.data.quantity);
            setTotalGet(data.data.totalGet);
            setTotalPrice(data.data.totalPrice);
      });
  }, [productId, orderDataId, email]);
    
    const handleReturn = () => {
        let obj = {
          quantity: quantity,
          return: productInfo?.totalGet - totalGet,
          totalPrice: totalPrice,
        };
        console.log(obj);
        fetch(
          `http://localhost:5000/api/v1/order/order-return/${productId}/${orderDataId}`,
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
        const minusAmount = parseInt(parseInt(e.target.value) / parseInt(productInfo?.buy + productInfo?.get)) + 1

        const y = parseInt(productInfo?.totalGet);
        const z = parseInt(e.target.value);
        const x = parseInt(y - z);
        const p = parseInt(productInfo?.quantity)
        console.log(parseInt(y/x));

        const countQuantity = parseInt(p - parseInt(y / x));
        console.log(countQuantity);

        if (countQuantity=='') {
            setQuantity(productInfo?.quantity);
        }

        if (parseInt(e.target.value) == 0 || e.target.value == '') {
            setTotalGet(productInfo?.totalGet);
        } else {
            setTotalGet(productInfo?.totalGet - (parseInt(e.target.value) + minusAmount));   
        }

        setTotalPrice(productInfo?.totalPrice - (e.target.value) * (productInfo?.price - productInfo?.discountAmount))

        if (countQuantity<0) {
          setQuantity(0);
        } else {
            setQuantity(countQuantity);
        }
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
            <div className="flex justify-between my-1">
              <div className="text-xl">Buy: {productInfo?.buy}</div>
              <div className="text-xl">Get: {productInfo?.get}</div>
            </div>
            <div className="text-xl">Quantity: <span id='updateQuantity'>{quantity}</span></div>
            <div className="text-xl">Total Get: <span id="updateTotalGet">{totalGet}</span></div>
            <div className="text-xl my-1">Total Price: <span id="updateTotalPrice">{totalPrice}</span></div>
            <div className="text-xl my-1">
              Order Date: {dateFormatter(productInfo?.orderDate)}
            </div>
            <div className="mt-8">
              <div className="relative w-max">
                <input
                  className="peer h-[50px] border-b border-[#1B8EF8] bg-blue-100 px-2 pt-4 text-[#1B8EF8] focus:outline-none dark:bg-blue-500/20"
                  type="number"
                  id="return"
                  onChange={(e) => handleChange(e) }
                  max={productInfo?.totalGet-quantity}
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
                <button onClick={handleReturn} className="btn btn-warning">Return</button>
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