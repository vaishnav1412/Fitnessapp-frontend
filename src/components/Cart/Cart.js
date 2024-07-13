import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";
const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState([]);
  const [cart, setCart] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = cart.userId;

  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.fetchCartDetails);
      dispatch(hideLoading());
      if (response) {
        setList(response.data.data.products);
        setCart(response.data.data);
        setTotalPrice(response.data.total);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const increment = async (id) => {
    const formData = {
      id,
      userId,
    };
    if (formData) {
      const response = await instance.post(apiEndPoints.increment, formData);
      if (response.data.success) {
        fetchUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } else {
      console.log("something went wrong");
    }
  };

  const decrement = async (id) => {
    const formData = {
      id,
      userId,
    };
    if (formData) {
      const response = await instance.post(apiEndPoints.decrement, formData);
      if (response.data.success) {
        fetchUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } else {
      console.log("something went wrong");
    }
  };
  const deleteItem = async (productId) => {
    try {
      const formData = {
        productId,
        userId,
      };
      if (productId) {
        const response = await instance.post(
          apiEndPoints.deleteCartProduct,
          formData
        );

        if (response.data.success) {
          fetchUserDetails();
          toast.success(response.data.message);
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

  const goToCheckout = () => {
    navigate("/user/checkout");
  };

  return (
    <div className="bg-white/70 pb-6 h-full w-full">
      <div className=" py-2 md:block hidden">
        <ol class="flex items-center whitespace-nowrap" aria-label="Breadcrumb">
          <li class="inline-flex items-center">
            <a
              class="flex items-center text-sm text-gray-950 hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="/user/home"
            >
              Home
            </a>
            <svg
              class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-950 "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li class="inline-flex items-center">
            <a
              class="flex items-center text-sm text-gray-950 hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="/user/shop"
            >
              shop
              <svg
                class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-950 "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </li>

          <li
            class="inline-flex items-center text-sm font-semibold  truncate dark:text-white"
            aria-current="page"
          >
            cart
          </li>
        </ol>
      </div>
      <div className="bg-white">
        <div class="font-[sans-serif]">
          <div class="grid lg:grid-cols-3 gap-12 p-6">
            <div class="lg:col-span-2 bg-white divide-y">

              
            {list.map((list, index) => {
              return (
              <div class="grid md:grid-cols-4 items-center gap-8 py-6" key={index}>
                <div class="md:col-span-2 flex items-center md:gap-6 gap-3">
                  <div class="w-32 h-22 shrink-0 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
                    <img
                        src={`http://localhost:3001/upload/${list?.image}`}
                      class="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <div>
                    <h3 class="text-lg font-extrabold text-[#333]">
                    {list?.name}
                    </h3>
                    <h6 class="text-md text-gray-500 mt-2">
                      Category: <strong class="ml-2"> {list?.catogory === "1" ? "gain" : "loss"}</strong>
                    </h6>
                  </div>
                </div>
                <div class="flex">
                  <button
                    onClick={() => {
                      increment(list?.productId);
                    }}
                    type="button"
                    class="bg-transparent py-2 font-semibold text-[#333]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 fill-current"
                      viewBox="0 0 124 124"
                    >
                      <path
                        d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="bg-transparent mx-4 px-4 py-2 font-semibold text-[#333] text-md shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)]"
                  >
                   {list.count}
                  </button>
                  <button
                   onClick={() => {
                    decrement(list?.productId);
                  }}
                    type="button"
                    class="bg-transparent py-2 font-semibold text-[#333]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 fill-current"
                      viewBox="0 0 42 42"
                    >
                      <path
                        d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex md:items-center ">
                  <h4 class="text-lg font-bold text-[#333]"> ₹{list.price}</h4>
                  <svg
                    onClick={() => {
                      deleteItem(list?.productId);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 ml-auto"
                    viewBox="0 0 320.591 320.591"
                  >
                    <path
                      d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              )})}
            </div>
            <div class="bg-gray-100 rounded p-6">
              <h3 class="text-xl font-extrabold text-[#333] border-b pb-4">
                Order Summary
              </h3>
              <ul class="text-[#333] divide-y mt-6">
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Subtotal <span class="ml-auto font-bold"> ₹{totalPrice}</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Shipping <span class="ml-auto font-bold">₹0</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4">
                  Tax <span class="ml-auto font-bold"> ₹0</span>
                </li>
                <li class="flex flex-wrap gap-4 text-md py-4 font-bold">
                  Total <span class="ml-auto"> ₹{totalPrice}</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  goToCheckout();
                }}
                type="button"
                class="mt-6 text-md px-6 py-2.5 w-full bg-red-700 hover:bg-red-900 text-white rounded"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
