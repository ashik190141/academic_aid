const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getKeyFromLocalStorage } from "../../utils/getKeyFromLocalStorage";
import { userEmail } from "../../utils/userInfo";

const AddProduct = () => {

    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const navigate = useNavigate();
    const [image, setImage] = useState(null)
    const handleProduct = event => {
        console.log('occur');
        event.preventDefault();

        const email = userEmail(getKeyFromLocalStorage());

        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;
        const description = form.description.value;



        const formdata = new FormData();
        formdata.append('image', image);

        //send data to server
        fetch(image_hosting_url, {
            method: "POST",
            body: formdata,
        })
        .then((res) => res.json())
            .then(imgResponse => {
                console.log(imgResponse);
                if (imgResponse.success) {
                    console.log('hit');
                    const image_url = imgResponse.data.display_url
                    const newProduct = { name, price, image: image_url, description, category, email }
                    fetch("http://localhost:5000/api/v1/product/create-product", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(newProduct),
                    }).then((res) =>
                        res.json().then((data) => {
                            console.log(data);
                            if (data.result) {
                                form.reset();
                                // localStorage.setItem("mail", email);
                                Swal.fire({
                                    title: "Success!",
                                    text: "Product Added Successful",
                                    icon: "success",
                                    confirmButtonText: "Cool!!!",
                                });
                                navigate('/');
                            }

                        })
                    );
                }
            })

    }

    // const handleImage = (e) => {
    //     setImage(e.target.files[0])
    // }

    return (
        <div>
            <div className="max-w-5xl mx-auto py-10 ">
                <div>
                    <h2 className="text-3xl text-center my-7 italic font-thin ">Add Your Product</h2>
                </div>
                <div className="flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-full max-w-lg mx-auto rounded-none shadow-2xl">
                        <form onSubmit={handleProduct} className="card-body">

                            <div className="form-control">
                                <input type="text" name='name' placeholder="Product Name" className="input input-bordered border-black rounded-none" required />
                            </div>

                            <div className="form-control">
                                <input type="file" name='image' placeholder="Image Url" className="input input-bordered border-black rounded-none" required onChange={(e)=>setImage(e.target.files[0])} />
                            </div>

                            <div className="form-control">
                                <label className="">
                                    <select className="select input input-bordered border-black rounded-none  w-full " name="category">
                                        <option>category</option>
                                        <option value='Paper'>Paper</option>
                                        <option value='Pen'>Pen</option>
                                        <option value='Book'>Books</option>
                                    </select>
                                </label>
                            </div>

                            <div className="form-control">
                                <input type="text" name='price' placeholder="Price" className="input input-bordered border-black rounded-none" required />
                            </div>


                            <div className="form-control">
                                <input type="text" name='description' placeholder="Details" className="input input-bordered border-black rounded-none" required />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-neutral rounded-none">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;