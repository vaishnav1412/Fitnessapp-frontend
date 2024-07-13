import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";
import "./Subscription.css"
const Subscription = () => {
  const [plan, setPlan] = useState([]);
  const [user, setUser] = useState("");
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const id = user._id;

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.userPlanList);
      dispatch(hideLoading());
      setPlan(response.data.data);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        dispatch(showLoading());
        const response = await instance.post(apiEndPoints.userProfileDetails);
        setUser(response.data.data);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const purchase = async (plan) => {
    const formData = {
      plan,
      id,
    };
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.planPurchase, formData);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);

        setOrder(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  const verifyPayment = async () => {
    const formData = {
      id,
    };
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.planVerifyPayment, formData);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/user/userprofile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
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
        if (response.error) {
          // Handle any payment failure (including cancellation by user)
          toast.error("Payment failed. Please try again later.");
          console.error("Payment Error:", response.error); // Log the error details for debugging
        } else {
          // Handle successful payment
          verifyPayment(response, order);
        }
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
      modal: {
        ondismiss: function() {
          // Handle modal dismissal (user closed the payment window)
          toast.error("Payment modal closed.");
        }
      }
    };
  
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  
  
  

  console.log(order);
  useEffect(() => {
    if (order) {
      razorpayPayment(order);
    }
  }, [order]);

  return (
    <div className="border-y-8 border-white">
    <section className="py-12 bg-black">
      <div className="grid gap-6 w-full px-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {plan.map((plan) => (
          <div key={plan._id} className="flex flex-col overflow-hidden border-4 border-slate-800 rounded-2xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 bg-white">
              <p className="text-xl font-semibold bg-red-700 text-white px-3 w-56 text-center rounded-tl-3xl py-2 rounded-ee-3xl">
                {plan.name}
              </p>
              <p className="text-5xl font-bold">
                {plan.price} ₹
                <span className="text-2xl dark:text-gray-800">/{plan.duration}month</span>
              </p>
            </div>
            <div className="flex flex-col px-2 py-8 bg-black">
              <ul className="self-stretch space-y-2 flex-col items-start">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex justify-start p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 dark:text-red-700 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="px-8 py-3 mt-6 text-lg font-semibold rounded-xl sm:mt-12 bg-red-700 text-white transition-colors hover:bg-gradient-to-l from-red-300 to-red-600"
                onClick={() => purchase(plan._id)}
              >
                Buy Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
  
  

  );
};

export default Subscription;
