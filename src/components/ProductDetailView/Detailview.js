import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";

const Detailview = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const location = useLocation();
  const productId = location.state.productId;
  const id = user?._id;

  const fetchProduct = async () => {
    try {
      const formData = {
        productId,
      };
      if (productId) {
        const response = await instance.post(
          apiEndPoints.userfetchProduct,
          formData
        );

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await instance.post(apiEndPoints.userProfileDetails);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchProduct();
  }, []);

  const addToCart = async (productId, id) => {
    try {
      if (productId && id) {
        const formData = {
          productId,
          id,
        };

        if (formData) {
          const response = await instance.post(
            apiEndPoints.userAddToCart,
            formData
          );
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error("something went wrong..");
        }
      } else {
        toast.error("something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-white/30">
      <div class="font-[sans-serif] bg-slate-100">
        <div class="p-6 lg:max-w-7xl max-w-4xl mx-auto">
          <div class="grid justify-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-[4px_4px_6px_6px_rgba(0,0,0)] p-6">
            <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div class="px-2 py-5 justify-center flex rounded-xl bg-slate-300 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] relative">
                <img
                  src={`http://localhost:3001/upload/${product[0]?.image}`}
                  alt="Product"
                  class="w-3/5 rounded object-cover"
                />
              </div>
            </div>
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-extrabold text-[#333]">
                {product[0]?.name} |{" "}
                {product[0]?.catogory === "1"
                  ? "Weight Gain "
                  : "Weight Lose "}
              </h2>
              <div class="flex flex-wrap gap-4 mt-6">
                <p class="text-[#333] text-4xl font-bold">${product[0]?.sellingPrice}</p>
                <p class="text-gray-400 text-xl">
                  <strike>${product[0]?.price}</strike>{" "}
                  <span class="text-sm ml-1">Tax included</span>
                </p>
              </div>
              <div class="flex space-x-2 mt-4">
                <svg
                  class="w-5 fill-[#333]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  class="w-5 fill-[#333]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  class="w-5 fill-[#333]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  class="w-5 fill-[#333]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  class="w-5 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <h4 class="text-[#333] text-base">500 Reviews</h4>
              </div>
              <div class="mt-10">
                <h3 class="text-lg font-bold text-green-500">{product[0]?.discount}% Offer</h3>
                <div class="flex flex-wrap gap-4 mt-4 ">
                 <h2 className="text-red-500 "> <b className="text-black mr-2">Note:-</b>Product delivery avaliable only on Kannur district</h2>
                </div>
              </div>
              <div class="flex align-middle justify-center mt-10">
               
              <a onClick={() => {
                  addToCart(product[0]?._id, id);
                }}
                class="relative inline-flex mt-3 items-center justify-center min-w-[250px] px-6 py-2 overflow-hidden font-medium  text-orange-500 rounded-lg bg-gradient-to-r  from-orange-600 to-orange-300 transition duration-300 ease-out border-2 border-orange-400  shadow-2xl group"
              >
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r rounded-md from-orange-300 to-orange-600 group-hover:translate-x-0 ease">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  ADD TO CART
                </span>
                <span class="relative invisible">ADD TO CART</span>
              </a>
              </div>
            </div>
          </div>
          <div class="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <h3 class="text-lg font-bold text-[#333]">Product information</h3>
            <ul class="mt-6 space-y-6 text-[#333]">
              <li class="text-sm">
                TYPE <span class="ml-4 float-right">Nutrition supplyment</span>
              </li>
              <li class="text-sm">
                NAME <span class="ml-4 float-right">{product[0]?.name}</span>
              </li>
              <li class="text-sm">
                QUANTITY <span class="ml-4 float-right">{product[0]?.quantity}</span>
              </li>
              <li class="text-sm">
                DESCRIPTION{" "}
                <span class="ml-4 float-right">{product[0]?.description}</span>
              </li>
             
              
            </ul>
          </div>
          <div class="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <h3 class="text-lg font-bold text-[#333]">Reviews(10)</h3>
            <div class="grid md:grid-cols-2 gap-12 mt-6">
              <div>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <p class="text-sm text-[#333] font-bold">5.0</p>
                    <svg
                      class="w-5 fill-[#333] ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-gray-400 rounded w-full h-2 ml-3">
                      <div class="w-2/3 h-full rounded bg-[#333]"></div>
                    </div>
                    <p class="text-sm text-[#333] font-bold ml-3">66%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-[#333] font-bold">4.0</p>
                    <svg
                      class="w-5 fill-[#333] ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-gray-400 rounded w-full h-2 ml-3">
                      <div class="w-1/3 h-full rounded bg-[#333]"></div>
                    </div>
                    <p class="text-sm text-[#333] font-bold ml-3">33%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-[#333] font-bold">3.0</p>
                    <svg
                      class="w-5 fill-[#333] ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-gray-400 rounded w-full h-2 ml-3">
                      <div class="w-1/6 h-full rounded bg-[#333]"></div>
                    </div>
                    <p class="text-sm text-[#333] font-bold ml-3">16%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-[#333] font-bold">2.0</p>
                    <svg
                      class="w-5 fill-[#333] ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-gray-400 rounded w-full h-2 ml-3">
                      <div class="w-1/12 h-full rounded bg-[#333]"></div>
                    </div>
                    <p class="text-sm text-[#333] font-bold ml-3">8%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-[#333] font-bold">1.0</p>
                    <svg
                      class="w-5 fill-[#333] ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-gray-400 rounded w-full h-2 ml-3">
                      <div class="w-[6%] h-full rounded bg-[#333]"></div>
                    </div>
                    <p class="text-sm text-[#333] font-bold ml-3">6%</p>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="flex items-start">
                  <img
                    src="https://readymadeui.com/team-2.webp"
                    class="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div class="ml-3">
                    <h4 class="text-sm font-bold text-[#333]">John Doe</h4>
                    <div class="flex space-x-1 mt-1">
                      <svg
                        class="w-4 fill-[#333]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#333]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#333]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg
                        class="w-4 fill-[#CED5D8]"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <p class="text-xs !ml-2 font-semibold text-[#333]">
                        2 mins ago
                      </p>
                    </div>
                    <p class="text-sm mt-4 text-[#333]">
                      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                      eiusmod tempor incidunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  class="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded"
                >
                  Read all reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailview;
