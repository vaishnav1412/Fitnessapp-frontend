import './enteremail.css'
import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../../util/api";
const Enteremail = () => {
  const navigate =useNavigate()
  const [email,setEmail] = useState('')
  

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   const handleEmail = (event) =>{
     setEmail(event.target.value)
   }

   const handleSubmit =async (event) =>{
    event.preventDefault();
    let isVarified = true;
    if(!email.includes("@")|| !emailPattern.test(email)){
        isVarified=false; 
        toast.error('Enter a valid email')
    }
    if(isVarified){
      const formData = {
        email
      };

      try {
        const response = await axios.post(apiEndPoints.confirmEmail, formData);
        if (response.data.success) {
          toast('Rediarected to otp page')
          navigate("/public/forgototp", { state: { email } }); 
        } else {
          toast.error(response.data.message);
          
        }
      } catch (error) {
        console.log('error');
      }
    }
   }


  return (
    <div class="relative flex h-screen flex-col justify-center overflow-hidden py-12 otps bg-no-repeat bg-cover md:px-0 px-3">
  <div class="relative bg-white/70 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-8">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Reset password</p>
        </div>
        <div class="flex flex-col space-y-1 text-sm font-medium text-gray-400">
          <p class="text-slate-700">Enter your login email and we'll send</p>
          <p class="text-slate-700">you a link to reset a password</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} method="post">
          <div class="flex flex-col space-y-8">
            <div class="flex flex-row items-center justify-between gap-1 mx-auto w-full max-w-xl">
              <div class="w-full">
                <input
                  onChange={handleEmail}
                  class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-2 outline-none rounded-md border border-gray-200 text-lg shadow-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div class="flex flex-col space-y-5">
              <div>
                <button
                  type="submit"
                  class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-700 border-none text-white text-md shadow-lg hover:bg-red-900"
                >
                  Reset Password
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

export default Enteremail
