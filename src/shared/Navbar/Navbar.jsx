import { useEffect, useRef, useState } from "react";
import { FaUser, FaUserMinus } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { userRole } from "../../utils/userRole";


const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const navigate = useNavigate()
    let user = null;
    if(localStorage.getItem('key')){
      user=localStorage.getItem("key")
    }
    let role = null;
    if (localStorage.getItem("key")) {
      role = userRole(localStorage.getItem("key"));
    } 

    const handleLogout = () => {
      navigate("/")
      localStorage.removeItem('key');
    }
  
    useEffect(() => {
      const closeDropDown = (e) => {
        if (!dropDownMenuRef?.current?.contains(e?.target)) {
          setDropDownState(false);
        }
      };
  
      document.addEventListener('mousedown', closeDropDown);
  
      return () => {
        document.removeEventListener('mousedown', closeDropDown);
      };
    }, []);

    const navlinks = (
      <>
        {/* <li>
          {" "}
          <NavLink
            to="/"
            className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
          >
            Home
            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li> */}

        {role == "admin" && (
          <li>
            <NavLink
              to="/addProduct"
              className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
            >
              Add Product
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        )}

        {role == "admin" && (
          <li>
            <NavLink
              to="/all-user"
              className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
            >
              All User
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        )}

        {role == "admin" && (
          <li>
            <NavLink
              to="/dashboard"
              className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
            >
              Dashboard
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/allProduct"
            className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
          >
            Product
            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/package"
            className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
          >
            Package
            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>

        {role && <li>
          <NavLink
            to="/my-order"
            className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
          >
            My Order
            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>}

        {role == "admin" && (
          <li>
            <NavLink
              to="/all-order"
              className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
            >
              Order
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        )}

        {/* <li><NavLink to='/aboutUs' className="text-zinc-600 font-bold group flex  cursor-pointer flex-col">About<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span></NavLink></li> */}

        {/* <li><NavLink to='/dashboard' className="text-zinc-600 font-bold group flex  cursor-pointer flex-col">Dashboard<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span></NavLink></li> */}

        <li>
          <NavLink
            to="/cart"
            className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
          >
            {" "}
            <IoIosCart className="text-xl"></IoIosCart>
            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>

        <div className="flex items-center justify-center gap-5">
          {user && (
            <div className="flex gap-5 items-center">
              <div className="text-zinc-600 font-bold group flex  cursor-pointer flex-col">
                <FaUserMinus
                  onClick={handleLogout}
                  className=" text-2xl hover:text-slate-800"
                ></FaUserMinus>
              </div>
              <div>{role}</div>
            </div>
          )}
        </div>

        {!user && (
          <li>
            <NavLink
              to="/signIn"
              className="text-zinc-600 font-bold group flex  cursor-pointer flex-col"
            >
              <FaUser />
              <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        )}
      </>
    );
    return (
        <div>
            <nav className="flex items-center justify-between font-play px-4 py-2 text-[#2D4739]">
      <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
        <div className='flex items-center justify-center text-[#2D4739] gap-3'>
          <img className='w-12' src="" alt="" />
          <h2 className='font text-2xl font-bold'>AcademicAid</h2>
        </div>

      </div>
      <ul className="hidden items-center justify-between gap-10 md:flex">
        {navlinks}
      </ul>
      <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
        {dropDownState && (
          <ul className=" z-10  gap-2  bg-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base items-center">
            {navlinks}
          </ul>
        )}
      </div>
    </nav>
        </div>
    );
};

export default Navbar;