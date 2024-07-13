import { useLocation } from "react-router-dom";
import "./otp.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { apiEndPoints } from "../../util/api";
const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const [digit5, setDigit5] = useState("");
  const [digit6, setDigit6] = useState("");

  const handleDigitChange = (event, setDigit) => {
    
    setDigit(event.target.value);
  };
  const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (otp.length < 6 || otp.length > 6) {
      toast.error("Please enter a valid otp");
      isVarified = false;
    }

    if (isVarified) {
      const formData = {
        otp,
        email,
      };
      try {
        const response = await axios.post(apiEndPoints.otp, formData);

        if (response.data.success) {
          toast.success(response.data.message);

          navigate("/public/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Email varification failed :", error);
      }
    }
  };


  const handleResend = async () => {
    const formData ={
      email
    }
    console.log(formData);
    try {
     const response = await axios.post(apiEndPoints.resendCode,formData);
     console.log(response);
      toast.success("Verification code resent successfully");
    } catch (error) {
      console.error("Resending code failed:", error);
      toast.error("Error resending verification code");
    }
  };
  return (
    <div class="relative flex h-screen flex-col justify-center overflow-hidden py-12 otps bg-no-repeat bg-cover ">
      <div class="relative bg-white/70 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p className="text-slate-700">
              We have sent a code to your email {email} 
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} method="post">
              <div class="flex flex-col space-y-10">
                <div class="flex flex-row items-center justify-between gap-1 mx-auto w-full max-w-xl">
                  <div class="w-14 h-14 ">
                    <input
                      onChange={(e) => handleDigitChange(e, setDigit1)}
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      maxLength={1} 
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      onChange={(e) => handleDigitChange(e, setDigit2)}
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      maxLength={1} 
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      onChange={(e) => handleDigitChange(e, setDigit3)}
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      maxLength={1} 
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      onChange={(e) => handleDigitChange(e, setDigit4)}
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      maxLength={1} 
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      onChange={(e) => handleDigitChange(e, setDigit5)}
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      maxLength={1} 
                    />
                  </div>
                  <div class="w-14 h-14 ">
                    <input
                      onChange={(e) => handleDigitChange(e, setDigit6)}
                      class="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      maxLength={1} 
                    />
                  </div>
                </div>

                <div class="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-600 border-none hover:bg-red-700 text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p className="text-slate-700">Didn't recieve code?</p>{" "}
                    <a  onClick={handleResend}
                      class="flex flex-row items-center text-blue-600"
                    
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
