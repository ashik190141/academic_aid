import React, { useEffect, useState } from 'react';
import { userEmail } from '../../../utils/userInfo';

import Modal from "react-modal";
import MakeDiscount from '../MakeDiscount/MakeDiscount';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AllProduct = () => {
    let key = null;
    let email = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
      email = userEmail(key);
    }

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(id) {
        setProductId(id);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
      fetch(`http://localhost:5000/api/v1/product/all-product/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
          // setRecords(data);
        });
    }, [email]);
    return (
      <div>
        <div className="grid grid-cols-3 gap-5 my-10">
          {products?.data?.map((product) => (
            <div key={product._id}>
              <div className="mx-auto my-20 max-w-[350px] space-y-6 rounded-xl bg-white px-4 pb-8 pt-4 font-sans shadow-lg dark:bg-[#18181B]">
                <div className="relative flex h-48 w-full justify-center lg:h-[280px]">
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    {/* love  */}
                    <div className="flex items-center">
                      <svg
                        width={30}
                        className="fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500 "
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <g strokeWidth="0"></g>{" "}
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>{" "}
                        <g id="SVGRepo_iconCarrier">
                          <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                        </g>
                      </svg>
                    </div>
                    <button className="rounded-xl bg-[#0095FF] px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">
                      {product?.price}
                    </button>
                    {/* <button className="rounded-xl bg-[#0095FF] px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">
                      {product?.discountPrice}
                    </button> */}
                  </div>
                  <img
                    width={300}
                    height={300}
                    className="h-full w-full rounded-lg bg-black/40"
                    src={product?.image}
                    alt="card navigate ui"
                  />
                </div>
                <div className="mx-auto w-[85%] space-y-2 font-semibold">
                  <h6 className="text-sm md:text-base">
                    {product?.name}
                  </h6>
                  <p className="text-xs font-semibold text-gray-400 md:text-sm">
                    {product.category}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
                  <button
                    onClick={() => openModal(product._id)}
                    className="rounded-lg bg-[#49B2FF] px-4 py-2 font-sans font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600"
                  >
                    Make Discount
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="flex justify-end">
              <button
                className="text-xl border border-black px-5"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div>
              <MakeDiscount
                productId={productId}
                closeModal={closeModal}
              ></MakeDiscount>
            </div>
          </Modal>
        </div>
      </div>
    );
};

export default AllProduct;