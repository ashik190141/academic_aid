import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { decodeToken } from "../../../utils/decodeToken";


const SignUp = () => {
    const navigate = useNavigate();

    const handleUser = event =>{
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const password = form.password.value;
        const role = form.role.value;
        const email = form.email.value;
        
        
        const newUser = {name,password,role,email,}
        console.log(newUser);

        //send data to server
        fetch("http://localhost:5000/api/v1/auth/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        }).then((res) =>
          res.json().then((data) => {
            console.log(data);
            if (data.success) {
              form.reset();
                localStorage.setItem("key", data.token);
              const userData = decodeToken(data.token);
              console.log(userData);
              Swal.fire({
                title: "Success!",
                text: "Registration Successful",
                icon: "success",
                confirmButtonText: "Cool!!!",
              });
              navigate('/');
            }
            
          })
        );
    }
    return (
        <div className="flex h-screen items-center justify-center bg-[#8EA7E9]/20 p-6 md:p-0">
            <div className="flex h-full w-full overflow-hidden rounded-xl shadow-md  md:h-[90%] md:w-[60%] lg:h-[80%]">
                {/* register design side  */}
                <div className="relative hidden h-full items-center justify-center bg-[#8EA7E9] md:flex md:w-[60%] lg:w-[40%]">
                    <div className="absolute -top-2 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]"></div>
                    <div className="absolute bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]"></div>
                    <div className="absolute -right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd] transition-all"></div>
                    <div className="absolute left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full  bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd]"></div>
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-medium text-white/80 ">Welcome Back</h2>
                        <p className="animate-pulse text-sm text-white/60">Please Enter You Information</p>
                    </div>
                </div>
                {/* input side  */}
                <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%]">
                    <h2 className="pb-8 text-center text-3xl font-bold text-[#8EA7E9]">Register Here</h2>
                    <form onSubmit={handleUser} className="flex  w-full flex-col items-center justify-center gap-4">
                        <input className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]" type="text" placeholder="Name" name="name" />

                        <input className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]" type="email" placeholder="Email" name="email" />


                        <div className=" w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]" >
                            <label >
                                <select name="role">
                                    <option>Register Type</option>
                                    <option value='School'>School</option>
                                    <option value='ShopOwner'>BookShop</option>
                                    <option value='General'>General</option>
                                </select>
                            </label>
                        </div>

                        <input className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]" type="password" placeholder="Password" name="password" />
                        <p className="text-[14px] text-gray-400">Already have an account ? <Link to="/signIn" className="text-[#8EA7E9] ">Sign In</Link></p>
                        <input className="w-[80%] btn  rounded-lg bg-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]" type="submit" />
                    </form>
                    {/* divider  */}
                    <div className="my-8 flex items-center px-8">
                        <hr className="flex-1" />
                        <div className="mx-4 text-gray-400">OR</div>
                        <hr className="flex-1" />
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default SignUp;