import React, { useState } from "react";
import "./login.css";
import instance from "../../Axios/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { apiEndPoints } from "../../util/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import RegisterHeadder from "../RegisterHeadder";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      isVarified = false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      isVarified = false;
    }

    if (isVarified) {
      const formData = {
        email,
        password,
      };

      try {
        dispatch(showLoading());
        const response = await instance.post(apiEndPoints.login, formData);
        dispatch(hideLoading());

        if (response.data.success) {
          toast.success(response.data.message);
          toast("Redirected to home page");
          localStorage.setItem("token", response.data.data);
          navigate("/user/home", { state: { email } });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch(hideLoading());
      }
    }
  };

  const googleSign = async (name, email) => {
    try {
      const formData = {
        name,
        email,
      };

      if (formData) {
        const response = await instance.post(apiEndPoints.googleLogin, formData);

        if (response.data.success) {
          toast.success(response.data.message);
          toast("Redirected to home page");
          navigate("/user/home", { state: { email } });
          localStorage.setItem("token", response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-cover bg-no-repeat register-backgroundimage">
      <div className="h-full w-full md:bg-transparent bg-white/20 ">
        <div >
          <RegisterHeadder />
        </div>
        <form className="md:px-0 px-4 md:pt-0 pt-16 " onSubmit={handleSubmit} >
          <div className="lg:ml-[60%] bg-white/50 shadow-md rounded-3xl pt-10 pb-12 mt-5 w-full md:w-3/4 lg:w-[370px] h-auto md:h-600 overflow-auto">
            <div className="py-5 flex lg:gap-[134px] md:gap-[110px] gap-[100px] pl-8">
              <h2 className="text-4xl font-bold">Sign in</h2>
              <div className="flex-col">
                <p className="text-sm text-black mb-0">No account?</p>
                <a
                  href="/public/register"
                  className="text-sm text-black hover:text-red-700"
                >
                  Sign up
                </a>
              </div>
            </div>

            <div className="h-full w-full px-8">
              <div className="w-full rounded-md focus:border-indigo-500 focus:outline-none mt-4 mb-6">
                <GoogleOAuthProvider clientId="964168966527-95slo1n2b6ket1dsthv99cvlt0uhl25g.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const details = jwt_decode(credentialResponse.credential);
                      console.log(details.name);
                      googleSign(details.name, details.email);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>

              <div>
                <div className="text-sm text-black font-semibold mb-1 mt-3">
                  <p>Enter your username or email address</p>
                </div>
                <input
                  onChange={handleEmail}
                  placeholder="Email address"
                  name="email"
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none text-[14px]"
                />
              </div>

              <div>
                <div className="text-sm text-black font-semibold mb-1 mt-3">
                  <p>Enter your password</p>
                </div>
                <div className="relative w-full">
                  <input
                    onChange={handlePassword}
                    placeholder="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 outline-none rounded-md border border-gray-300 text-lg shadow-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  />
                  <div
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={24} />
                    ) : (
                      <IoMdEye size={24} />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-right mt-2 mb-6">
                  <a
                    href="/public/email"
                    className="font-normal text-[13px] text-black hover:text-red-700"
                  >
                    Forgot Password
                  </a>
                </p>
              </div>

              <div>
                <button
                  className="block w-full px-4 py-2 rounded-md bg-red-700 text-white font-medium hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
