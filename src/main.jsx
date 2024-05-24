import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './layout/Main';
import Home from './components/Home/Home';
import SignIn from './components/Authentication/SignIn/SignIn';
import SignUp from './components/Authentication/SignUp/SignUp';
import AddProduct from './components/AddProduct/AddProduct';
import AllProducts from './components/AllProducts/AllProducts';
import Dashboard from './shared/Dashboard/Dashboard';
import CartItem from './components/CartItem/CartItem';
import MyOrder from './components/MyOrder/MyOrder';
import AllUser from './components/AllUser/AllUser';
import AllProduct from './components/AdminDashboard/AllProduct/AllProduct';
import UserBasedDiscount from './components/AdminDashboard/UserBasedDiscount/UserBasedDiscount';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/allProduct",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/my-order",
        element: <MyOrder></MyOrder>,
      },
      {
        path: "/cart",
        element: <CartItem></CartItem>,
      },
      {
        path: "/all-user",
        element: <AllUser></AllUser>,
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "all-product",
        element: <AllProduct></AllProduct>
      },
      {
        path: "user-discount",
        element: <UserBasedDiscount></UserBasedDiscount>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);