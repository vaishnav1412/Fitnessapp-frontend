import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const image = require("../assets/other/f89dface-07b2-48f7-91fc-e563eeddda33-removebg-preview.png");
const RegisterHeadder = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setClick(!click);
  };
  const content = (
    <>
      <div className="lg:hidden block absolute top-16 w-full  left-0 right-0 bg-white opacity-1 z-50 transition">
        <ul className="text-center text-xl p-20">
          <li
            onClick={() => {
              navigate("/");
            }}
            className="mb-4 py-4 border-b-4 border-red-700  bg-black  rounded-md  hover:border-red-600"
          >
            HOME
          </li>
          <li
            onClick={() => {
              navigate("/public/contactus");
            }}
            className="mb-4 py-4 border-b-4 border-red-700 bg-black rounded-md  hover:border-red-600"
          >
            CONTACT US
          </li>
          <li
            onClick={() => {
              navigate("/public/login");
            }}
            className="mb-4 py-4 border-b-4 border-red-700 bg-black rounded-md  hover:border-red-600"
          >
            {" "}
            SIGN IN
          </li>
          <li
            onClick={() => {
              navigate("/public/register");
            }}
            className="mb-4 py-4 border-b-4 border-red-700 bg-black rounded-md  hover:border-red-600"
          >
            SIGN UP
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div className="h-8vh flex md:justify-between  z-50 text-white md:py-5 md:px-20 px-6 py-4 flex-1 md:bg-transparent bg-black">
        <div className="md:hidden w-full  ">
          <img className="h-11 w-40" src={image} />
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-start font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-9 mr-16 text-[14px]">
              <li
                onClick={() => {
                  navigate("/");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                HOME
              </li>
              <li
                onClick={() => {
                  navigate("/public/contactus");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                CONTACT US
              </li>
              <li
                onClick={() => {
                  navigate("/public/login");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                SIGN IN
              </li>
              <li
                onClick={() => {
                  navigate("/public/register");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                SIGN UP
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

export default RegisterHeadder;
