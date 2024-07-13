import { useLocation } from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './forgototp.css'
import { apiEndPoints } from "../../util/api";
import React, { useState } from 'react'

const Forgototp = () => {
  const navigate = useNavigate()
    const location = useLocation()
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
    const handleSubmit = async(event)=>{
        event.preventDefault();
        let isVarified = true;
        if(otp==="" || otp.length<6){
            isVarified = false
            toast.error('Please enter a valid OTP')
        }
        if(isVarified){
          const formData = {
            otp,
            email
            };

            try {
              const response = await axios.post(apiEndPoints.forgotOtp, formData);

              if (response.data.success) {
                toast('Rediarected to password reset page')
               
                navigate("/public/resetpassword",{ state: { email } });
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
                console.error("Email varification failed :", error);
            }
        }
    }

  return (
    <div class="relative flex h-screen flex-col justify-center overflow-hidden py-12 otps bg-no-repeat bg-cover ">
      <div class="relative bg-white/70 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div class="flex flex-col text-sm font-medium text-gray-400">
              <p className="text-slate-700">
              We have sent a code to your email {email} 
              </p>
              <p className="text-slate-700">
               Enter it here to reset your password.
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
                      class="flex flex-row items-center justify-center text-center w-full border rounded-md outline-none py-3 bg-red-600 hover:bg-red-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgototp
