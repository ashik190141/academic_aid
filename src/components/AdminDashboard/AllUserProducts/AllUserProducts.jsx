import { useEffect, useState } from "react";


const AllUserProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of items per page

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/product/get-all-product-withUserRole/?page=${currentPage}&limit=${itemsPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data?.data);
            });
    }, [currentPage, itemsPerPage]);

    // Logic to calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
      <div className="">
        <h1 className="flex items-center justify-between mt-5 mb-5 text-4xl">
          All Products With Discount
        </h1>
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="text-center">Price</th>
                {/* <th>Discount</th> */}
                <th className="text-center">Category</th>
                <th className="text-center">School</th>
                <th className="text-center">Book Shop</th>
                <th className="text-center">User</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product) => (
                <tr key={product?._id}>
                  <td>{product?.name}</td>
                  <td className="text-center">৳ {product.price}</td>
                  {/* <td>৳ {product.price}</td> */}
                  <td className="text-center">{product.category}</td>
                  <td className="text-center">৳ {product.school}</td>
                  <td className="text-center">৳ {product.bookshop}</td>
                  <td className="text-center">৳ {product.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="pagination mt-5">
          {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
            (number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className="btn btn-sm btn-outline btn-circle space-x-3 mx-3"
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    );
};

export default AllUserProducts;