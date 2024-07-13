import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import { ImCancelCircle } from "react-icons/im";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiEndPoints } from "../../util/api";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState([]);
  const [cart, setCart] = useState("");
  const [order, setOrder] = useState("");
  const [addresses, setAddresses] = useState([]);

  const [address, setAddress] = useState("");
  const [addressId, setAddressId] = useState("");
  const [type1, setType1] = useState("");
  const [houseName1, setHouseName1] = useState("");
  const [localArea1, setLocalArea1] = useState("");
  const [po1, setPo1] = useState("");
  const [district1, setDistrict1] = useState("");
  const [pin1, setPin1] = useState("");

  const [renderState, setRenderState] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = cart?.userId;

  const [type, setType] = useState("");
  const [houseName, setHouseName] = useState("");
  const [localArea, setLocalArea] = useState("");
  const [po, setPo] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");

  const selectAddress = (id) => {
    setAddressId(id);
    getAddress1();
  };

  const handletype = (event) => {
    setType(event.target.value);
  };
  const handleHouseName = (event) => {
    setHouseName(event.target.value);
  };
  const handleLocalArea = (event) => {
    setLocalArea(event.target.value);
  };
  const handlePo = (event) => {
    setPo(event.target.value);
  };
  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handlePin = (event) => {
    setPin(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (type.length === 0) {
      toast.error("please enter valid type");
      isVarified = false;
    }
    if (houseName.length === 0) {
      toast.error("please enter valid housename");
      isVarified = false;
    }
    if (localArea.length === 0) {
      toast.error("please enter valid localarea");
      isVarified = false;
    }
    if (po.length === 0) {
      toast.error("please enter valid postoffice");
    }
    if (district.length === 0) {
      toast.error("please enter valid district");
    }
    if (pin <= 99999) {
      toast.error("please enter valid pin");
    }
    if (isVarified) {
      const formData = {
        type,
        houseName,
        localArea,
        po,
        district,
        pin,
        id,
      };
      try {
        const response = await instance.post(
          apiEndPoints.addCheckoutAddress,
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setRenderState(0);
          fetchUserDetails();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  //editaddress

  const handletypeedit = (event) => {
    setType1(event.target.value);
  };
  const handleHouseNameedit = (event) => {
    setHouseName1(event.target.value);
  };
  const handleLocalAreaedit = (event) => {
    setLocalArea1(event.target.value);
  };
  const handlePoedit = (event) => {
    setPo1(event.target.value);
  };
  const handleDistrictedit = (event) => {
    setDistrict1(event.target.value);
  };
  const handlePinedit = (event) => {
    setPin1(event.target.value);
  };

  const handleSubmitedit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (isVarified) {
      const formData = {
        type1,
        houseName1,
        localArea1,
        po1,
        district1,
        pin1,
        id,
        addressId,
      };
      try {
        const response = await instance.post(
          apiEndPoints.editCheckoutAddress,
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          fetchUserDetails();
          setRenderState(0);
        } else {
          toast.error(response.data.message);
          navigate("/user/checkout");
          setRenderState(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAddress1 = async () => {
    try {
      const formData = {
        addressId,
        id,
      };

      const response = await instance.post(
        "/api/user/fetchsingleaddress",
        formData
      );

      if (response.data.success) {
        setAddress(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress1();
  }, [renderState]);

  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.fetchCartDetails);
      dispatch(hideLoading());
      if (response.data.success) {
        setList(response.data.data.products);
        setCart(response.data.data);
        setTotalPrice(response.data.total);
        setAddresses(response.data.address);
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
  const deleteAddress = async (addressId) => {
    try {
      const formData = {
        addressId,
        id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "you want to delete this address?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        footer: '<a href="#">Learn more about delete address</a>',
        customClass: "swal-delete-address",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (addressId && id) {
            const response = await instance.post(
              apiEndPoints.deleteCheckoutAddress,
              formData
            );

            if (response.data.success) {
              fetchUserDetails();
            } else {
              toast.error(response.data.message);
            }
          } else {
            toast.error("something went wrong...");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionSelect = (addressId) => {
    setSelectedAddress(addressId);
  };
  const payment = async () => {
    const formData = {
      selectedAddress,
      id,
    };
    try {
      const response = await instance.post(
        apiEndPoints.productPurchase,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);

        setOrder(response.data.order);
        console.log(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async (response, order) => {
    const orderId = order.id;

    const formData = {
      orderId,
      id,
    };
    try {
      const response = await instance.post(
        apiEndPoints.varifyPayment,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/user/sucess");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function razorpayPayment(order) {
    var options = {
      key: "rzp_test_KgphPCgit7FD2N",
      amount: order.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response) {
        verifyPayment(response, order);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  useEffect(() => {
    if (order) {
      razorpayPayment(order);
    }
  }, [order]);

  return (
    <div>
      <div className="px-5 pt-2 pb-5 bg-white/90">
        <div className=" py-2">
          <ol
            class="flex items-center whitespace-nowrap"
            aria-label="Breadcrumb"
          >
            <li class="inline-flex items-center">
              <a
                class="flex items-center text-sm text-gray-950 hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
                href="#"
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
                href="#"
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
            <li class="inline-flex items-center">
              <a
                class="flex items-center text-sm text-gray-950 hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
                href="#"
              >
                cart
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
              class="inline-flex items-center text-sm font-semibold  truncate dark:text-gray-500"
              aria-current="page"
            >
              checkout
            </li>
          </ol>
        </div>



        <div class="md:h-screen h-auto grid grid-cols-1 lg:grid-cols-3 shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
  <div class="lg:col-span-2 col-span-3 bg-white space-y-4 px-4 lg:px-12">
    <div class="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
      <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
        <div class="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 sm:w-5 h-6 sm:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-sm font-medium ml-3">Checkout</div>
      </div>
      <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
        Complete your shipping and payment details below.
      </div>
      <div class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
    </div>
    <div class="rounded-md">
      <section>
        <div className="px-2 py-3 border-b-2 border-black">
          <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700">
            Shipping & Billing Information
          </h2>
        </div>
        <div className="p-2 y-3 text-center w-full mt-2 bg-gray-50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-600 my-2">
            Delivery Address
          </h2>
        </div>
        <div className="w-full flex justify-center p-2">
          <a
            onClick={() => {
              setRenderState(1);
            }}
            class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-red-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-red-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                class="w-5 h-5 text-black"
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
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                class="w-5 h-5 text-black"
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
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              Add Address
            </span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between align-middle justify-left w-full p-4 md:h-[310px] h-auto bg-gray-50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`flex-col gap-y-4 py-4 px-8 mx-2 my-4 bg-white text-left rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ${
                selectedAddress === address._id ? "border-2 border-red-600" : ""
              }`}
            >
              <div className="flex justify-between">
                {" "}
                <h1 className="text-lg font-semibold text-emerald-500">
                  {address?.type}
                </h1>
                <div className="flex justify-between">
                  <div
                    className="p-2"
                    onClick={() => {
                      setRenderState(2);
                      selectAddress(address._id);
                    }}
                  >
                    <BiSolidEdit />
                  </div>
                  <div
                    className="p-2"
                    onClick={() => {
                      deleteAddress(address._id, id);
                    }}
                  >
                    <RiDeleteBinLine />
                  </div>
                </div>
              </div>
              <div className="flex-col p-2">
                <h2>{address?.housename}</h2>
                <h2>{address?.localarea}</h2>
                <h2>{address?.postoffice}</h2>
                <h2>{address?.district}</h2>
                <h2>{address?.pin}</h2>
              </div>
              <a
                onClick={() => handleOptionSelect(address._id)}
                className={`relative inline-flex items-center md:px-12 px-9 py-1 overflow-hidden md:text-lg text-base font-medium text-red-600 hover:text-white group hover:bg-gray-50 ${
                  selectedAddress === address._id ? "border-2 border-red-600" : ""
                }`}
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-red-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start md:w-10 w-8 md:h-10 h-8 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
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
                <span className="relative">DELIVER HERE</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>

  <div class="col-span-1 bg-gray-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
    <h1 class="font-semibold text-2xl border-b-2 px-4 py-6">Order Summary</h1>
    <ul class="py-6 border-b-2 space-y-6 px-4 lg:px-8">
      {list.map((list, index) => (
        <li key={index} class="grid grid-cols-2 lg:grid-cols-6 gap-2 border-b-1">
          <div class="col-span-1 self-center">
            <img
              src={`http://localhost:3001/upload/${list?.image}`}
              alt="Product"
              class="rounded w-full"
            />
          </div>
          <div class="flex flex-col col-span-1 lg:col-span-3 pt-2">
            <span class="font-semibold text-sm">{list?.name}</span>
            <span class="text-sm inline-block pt-2">
              {list?.catogory === "1" ? "Gain" : "Lose"}
            </span>
          </div>
          <div class="col-span-1 lg:col-span-2 pt-3">
            <div class="flex items-center space-x-2 text-sm justify-between">
              <span class="font-semibold text-sm">
                {list?.count}x₹{list?.price}
              </span>
              <span class="font-semibold text-sm inline-block">
                ₹{list?.count * list?.price}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <div class="px-4 lg:px-8 border-b-2">
      <div class="flex justify-between py-4">
        <span>Subtotal</span>
        <span class="font-semibold"> ₹{totalPrice}</span>
      </div>
      <div class="flex justify-between py-4">
        <span>Shipping</span>
        <span class="font-semibold">Free</span>
      </div>
    </div>
    <div class="font-semibold text-xl px-4 lg:px-8 flex justify-between py-4">
      <span>Total</span>
      <span> ₹{totalPrice}</span>
    </div>
    <div
      className="w-full flex align-middle justify-center md:mb-0 mb-3"
      onClick={() => {
        payment();
      }}
    >
      <a class="relative inline-flex mt-3 items-center justify-center w-[80%] px-6 py-2 overflow-hidden font-medium text-red-600 rounded-lg bg-gradient-to-r from-red-600 to-orange-300 transition duration-300 ease-out border-2 border-orange-400 shadow-2xl group">
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
          Pay ₹{totalPrice}
        </span>
        <span class="relative invisible">Pay ₹{totalPrice}</span>
      </a>
    </div>
  </div>
</div>
</div>

















      <div className={renderState === 0 || renderState === 2 ? "hidden" : ""}>
        <div class="bg-gray-500/60 h-[808px]  flex justify-center w-full items-center absolute md:-mt-[808px] -mt-[1550px]">
          <div class="   bg-white/70 px-6 pt-5 pb-5 shadow-xl mx-auto w-[480px] -mt-36  border-slid border-2 rounded-md">
            <div class="mx-auto flex w-full  flex-col space-y-4">
              <div class="flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-5 w-full flex justify-end">
                  <ImCancelCircle
                    onClick={() => {
                      setRenderState(0);
                    }}
                  />
                </div>
                <div class="font-semibold text-5xl">
                  <p>Add Address</p>
                </div>
              </div>

              <div>
                <div>
                  <form method="post" onSubmit={handleSubmit}>
                    <div class="flex flex-col space-y-5">
                      <div class=" mx-auto w-full max-w-xl">
                        <div class="w-full  ">
                          <input
                            onChange={handletype}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            placeholder="Enter address type"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleHouseName}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your house name"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleLocalArea}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your local area"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handlePo}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your post office"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleDistrict}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your district"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mx-auto w-full max-w-xl">
                        <div class="w-full ">
                          <input
                            onChange={handlePin}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="number"
                            placeholder="Enter your pincode"
                          />
                        </div>
                      </div>

                      <div class="flex flex-col ">
                        <div>
                          <button
                            type="submit"
                            class="flex  flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-600 border-none hover:bg-red-700 text-white text-md shadow-lg my-3"
                          >
                            Add Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={renderState === 0 || renderState === 1 ? "hidden" : ""}>
        <div class="bg-gray-500/60 h-[808px] flex justify-center w-full items-center absolute md:-mt-[808px] -mt-[1550px]">
          <div class="   bg-white/70 px-6 pt-5 pb-5 shadow-xl mx-auto w-[480px] -mt-36  border-slid border-2 rounded-md">
            <div class="mx-auto flex w-full  flex-col space-y-4">
              <div class="flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-5 w-full flex justify-end">
                  <ImCancelCircle
                    onClick={() => {
                      setRenderState(0);
                    }}
                  />
                </div>
                <div class="font-semibold text-5xl">
                  <p>Edit Address</p>
                </div>
              </div>

              <div>
                <div>
                  <form method="post" onSubmit={handleSubmitedit}>
                    <div class="flex flex-col space-y-5">
                      <div class=" mx-auto w-full max-w-xl">
                        <div class="w-full  ">
                          <input
                            defaultValue={address?.type}
                            onChange={handletypeedit}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleHouseNameedit}
                              defaultValue={address?.housename}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              defaultValue={address?.localarea}
                              onChange={handleLocalAreaedit}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              defaultValue={address?.postoffice}
                              onChange={handlePoedit}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              defaultValue={address?.district}
                              onChange={handleDistrictedit}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mx-auto w-full max-w-xl">
                        <div class="w-full ">
                          <input
                            defaultValue={address?.pin}
                            onChange={handlePinedit}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="number"
                          />
                        </div>
                      </div>

                      <div class="flex flex-col ">
                        <div>
                          <button
                            type="submit"
                            class="flex  flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-600 border-none hover:bg-red-700 text-white text-md shadow-lg my-3"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
