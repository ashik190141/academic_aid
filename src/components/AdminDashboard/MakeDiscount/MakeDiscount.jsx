import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MakeDiscount = ({ productId, closeModal }) => {
  console.log(productId);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/product/get-single-product/${productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [productId]);

  const handleDiscount = (event) => {
    event.preventDefault();
    const form = event.target;
    const discount = form.discount.value;
    const discountInfo = { productId: productId, discountParentage: discount };
    fetch(`http://localhost:5000/api/v1/discount/create-discount/${productId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(discountInfo),
    }).then((res) =>
      res.json().then((data) => {
          if (data.result) {
            Swal.fire({
              title: "Success!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Okk!!!",
            }).then(result => {
                if (result.isConfirmed) {
                    closeModal();
                }
            });
        }
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-5">
      <div className="h-48">
        <img
          src={products?.data?.image}
          alt="product image"
          width="300px"
          height="300px"
          className="h-full w-full rounded-lg bg-black/40"
        />
      </div>
      <div>
        <form onSubmit={handleDiscount}>
          <div className="">
            <div className="form-control py-5">
              <input
                type="text"
                name="price"
                value={products?.data?.price}
                className="input input-bordered border-black rounded-none"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="number"
                name="discount"
                defaultValue={products?.data?.discountParentage}
                placeholder="Discount Parentage"
                className="input input-bordered border-black rounded-none"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral rounded-none">Confirm</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeDiscount;