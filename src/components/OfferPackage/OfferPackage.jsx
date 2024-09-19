import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userEmail } from "../../utils/userInfo";

const OfferPackage = () => {
  const [buyProduct, setBuyProduct] = useState('');
  const [getProduct, setGetProduct] = useState('');
  let key = null;
  let email = null;
  if (localStorage.getItem("key")) {
    key = localStorage.getItem("key");
    email = userEmail(key);
  }
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/product/all-product/${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [email]);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    let newItem = [];
    const exists = selectedItems.find(selectItem => selectItem._id == item._id);
    if (!exists) {
      newItem = [...selectedItems, item];
    } else {
      const remaining = selectedItems.filter(selectItem => selectItem._id != item._id);
      newItem = [...remaining];
    }
    setSelectedItems(newItem);
  };

  function findItem(id) {
    const item = selectedItems.find(item => item._id == id);
    if (item) return true;
    else return false;
  }

  const handlePackage = (event) => {
    event.preventDefault();

    const form = event.target;
    // const name = form.name.value;
    // const price = form.price.value;
    // const available = form.available.value;
    // const description = form.description.value;
    // const category = form.category.value;

    const packageInfo = {
      productId: selectedItems[0]._id,
      buyProduct: parseInt(document.getElementById(`buy`).value),
      getProduct: parseInt(document.getElementById(`get`).value),
      image: selectedItems[0].image,
      price: selectedItems[0].price
    };

    console.log(packageInfo);

    fetch("http://localhost:5000/api/v1/package/create-package", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(packageInfo),
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
        if (data.result) {
          form.reset();
          // localStorage.setItem("mail", email);
          Swal.fire({
            title: "Success!",
            text: "Package Added Successful",
            icon: "success",
            confirmButtonText: "OKK!!!",
          });
        }
      })
    );

  };

  return (
    <div className="grid grid-cols-3 mt-14">
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
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.map((item) => (
              <tr key={item._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      checked={findItem(item._id)}
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
                      <div className="text-sm opacity-50">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td>৳ {item.price}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border border-blue-600 mx-2 w-[500px]">
        <div>
          <h3 className="py-2">Selected Items:</h3>
          <ul>
            {selectedItems?.map((item, index) => (
              <li key={item._id} className="">
                <div className="flex items-center justify-between my-2 p-2 border border-blue-200 rounded-md mx-2">
                  <div className="flex items-start gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="text-start">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="font-medium text-red-600 pb-1 flex justify-end">
                      <span className="opacity-50">৳</span> {item.price}
                    </div>
                    <div className="flex gap-5">
                      <input
                        type="number"
                        required
                        id="buy"
                        onChange={(e) => setBuyProduct(e.target.value)}
                        placeholder="Buy"
                        className="input input-bordered rounded-none input-xs w-20 max-w-xs"
                      />
                      <input
                        type="number"
                        required
                        id="get"
                        onChange={(e) => setGetProduct(e.target.value)}
                        placeholder="Get"
                        className="input input-bordered rounded-none input-xs w-20 max-w-xs"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* _______________Form_____________ */}
          <div className="bg-slate-300 py-2 px-1 mt-7">
            <form onSubmit={handlePackage} className="space-y-2">
              <label className="input input-bordered flex items-center gap-2">
                Name :
                <input
                  name="name"
                  type="text"
                  className="grow"
                  placeholder="Combo"
                  value={`Buy ${buyProduct} Get ${getProduct}`}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Price : ৳
                <input
                  name="price"
                  type="text"
                  value={selectedItems[0]?.price * parseInt(buyProduct) || 0}
                  className="grow"
                  placeholder="200"
                />
              </label>
              {/* <label className="input input-bordered flex items-center gap-2">
                Description :
                <input
                  name="description"
                  type="text"
                  className="grow"
                  placeholder="Description"
                />
              </label> */}
              <label className="input input-bordered flex items-center gap-2">
                Category :
                <input
                  name="category"
                  type="text"
                  className="grow"
                  value={selectedItems[0]?.category || "Not Selected"}
                  placeholder="Category"
                />
              </label>
              {/* <label className="input input-bordered flex items-center gap-2">
                Available :
                <input
                  name="available"
                  type="text"
                  className="grow"
                  placeholder="200"
                />
              </label> */}
              <div className="flex items-end justify-end">
                <button type="submit" className="btn btn-outline">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPackage;
