import React, { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";

import instance from "../../Axios/axiosConfig";
const logo = require("../../assets/other/f89dface-07b2-48f7-91fc-e563eeddda33-removebg-preview.png");
const Headder = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const navigateBmi = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/public/login");
    }
  };

  const handleClick = () => {
    setClick(!click);
  };

  const content = (
    <>
      <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-white opacity-1 z-50 transition">
        <ul className="text-center text-xl p-20 overflow-y-scroll">
          <li
            onClick={() => {
              navigate("/");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            HOME
          </li>
          <li
            onClick={() => {
              navigate("/public/contactus");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1 cursor-pointer"
          >
            CONTACT US
          </li>

          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            SHOP
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            BMI
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            APPOINMENT
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1 cursor-pointer"
          >
            FITNESS
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            NOTIFICATION
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            PROFILE
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            SIGN IN
          </li>
          <li
            onClick={() => {
              navigate("/public/register");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white  cursor-pointer"
          >
            SIGN UP
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div className="h-8vh flex justify-between bg-none z-50 text-white lg:py-5 px-10 py-4 flex-1">
        <div className="h-11 w-40 md:-mt-0 -mt-2">
          <img src={logo} />
        </div>

        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-3 text-[14px]">
              <li
                onClick={() => {
                  navigate("/");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                HOME
              </li>
              <li
                onClick={() => {
                  navigate("/public/contactus");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                CONTACT US
              </li>

              <li
                onClick={() => {
                  navigate("/public/login");
                  toast.success("Please do sign in first");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                SHOP
              </li>

              <li
                onClick={() => {
                  navigate("/public/login");
                  toast.success("Please do sign in first");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                BMI
              </li>

              <li
                onClick={() => {
                  navigate("/public/login");
                  toast.success("Please do sign in first");
                }}
                className="transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                APPOINMENT
              </li>

              <li
                onClick={() => {
                  navigate("/public/login");
                  toast.success("Please do sign in first");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                FITNESS
              </li>

              <li
                onClick={() => {
                  navigate("/public/login");
                  toast.success("Please do sign in first");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                NOTIFICATION
              </li>

              <li
                onClick={() => {
                  navigate("/public/register");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                SIGN UP
              </li>
              <li
                onClick={() => {
                  navigate("/public/login");
                }}
                className=" transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                SIGN IN
              </li>
            </ul>
          </div>
        </div>

        <div>{click && content}</div>
        <button
          className="block sm:hidden transition text-white "
          onClick={handleClick}
        >
          {click ? <FaTimes /> : <LuMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Headder;
