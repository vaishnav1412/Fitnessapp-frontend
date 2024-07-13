import { useLocation } from "react-router-dom";
import "./resetpassword.css";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../../util/api";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Resetpassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordchange = (event) => {
    setPassword(event.target.value);
  };

  const cpasswordchange = (event) => {
    setCpassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;

    // Validation checks
    if (password.length < 8) {
      isVarified = false;
      setError("Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      isVarified = false;
      setError("Password must contain at least one uppercase letter, lowercase letter, number, and special character.");
    }

    if (password !== cpassword) {
      isVarified = false;
      setError("Passwords do not match.");
    }

    if (isVarified) {
      const formData = {
        password,
        email,
      };

      try {
        const response = await axios.post(apiEndPoints.resetPassword, formData);

        if (response.data.success) {
          toast("Redirected to login page");
          toast.success(response.data.message);
          navigate("/public/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Reset password failed:", error);
      }
    }
  };

  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden py-12 otps bg-no-repeat bg-cover md:px-0 px-3">
      <div className="relative bg-white/70 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset password</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} method="post">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col justify-between mx-auto w-full max-w-xl">
                  <p className="text-left mb-1">Enter your new password</p>
                  <div className="relative w-full">
                    <input
                      onChange={passwordchange}
                      className="w-full px-5 py-2 outline-none rounded-md border border-gray-200 text-lg shadow-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                    />
                    <div
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
                    </div>
                  </div>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>

                <div className="flex flex-col justify-between mx-auto w-full max-w-xl">
                  <p className="text-left mb-1">Confirm your new password</p>
                  <div className="w-full">
                    <input
                      onChange={cpasswordchange}
                      className="w-full px-5 py-2 outline-none rounded-md border border-gray-200 text-lg shadow-md bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="password"
                      placeholder="Re-Enter new password"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 border rounded-xl outline-none bg-red-700 hover:bg-red-900 border-none text-white text-md shadow-lg"
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
  );
};

export default Resetpassword;
