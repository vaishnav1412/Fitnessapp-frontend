import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { apiEndPoints } from "../../util/api";
import RegisterHeadder from "../RegisterHeadder";
const avathar = require("../../assets/other/register-avathar.png");

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState('');
  const [profile, setProfile] = useState(avathar);
  const [error, setError] = useState('');
  
  const [passwordStrength, setPasswordStrength] = useState({ strength: '', color: '' });
  const [eye,setEye] = useState(1)
  const [type,setType] =useState("password")

  const handleEye = ()=>{
    if(eye===1){
      setEye(0)
      setType("text")
    }else{
      setEye(1)
      setType("password")
    }
  }
  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeAge = (event) => {
    setAge(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    const pwd = event.target.value;
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  const handleimage = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
      setImage(selectedImage);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = ' Your password is weak';
    let color = 'red';

    if (password.length >= 8) {
      strength = 'Your password is Good';
      color = 'yellow';

      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
        strength = 'Your password is Strong';
        color = 'green';
      } else if (hasUppercase || hasLowercase || hasNumber || hasSpecialChar) {
        strength = 'Your password is Medium';
        color = 'orange';
      }
    }

    return { strength, color };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isVarified = true;
    if (name.trim() === "") {
      toast.error("Please enter a valid name");
      isVarified = false;
    }
    if (age < 18) {
      toast.error("Please enter a valid age");
      isVarified = false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      isVarified = false;
    }
    if (password.length < 8) {
      isVarified = false;
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    }
    if (!/[A-Z]/.test(password)) {
      isVarified = false;
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    }

    if (!/[a-z]/.test(password)) {
      isVarified = false;
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    }
    if (!/[0-9]/.test(password)) {
      isVarified = false;
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      isVarified = false;
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    }
    if (!image) {
      toast.error("Please select an image.");
      isVarified = false;
    }
    else if (typeof image.type === 'string' && !image.type.startsWith('image/')) {
      toast.error("Invalid image type. Please select a JPEG, PNG, or GIF image.");
      isVarified = false;
    }

    if (isVarified) {
      const formData = {
        name,
        age,
        email,
        password,
        image
      };
      try {
        dispatch(showLoading());
        const response = await axios.post(apiEndPoints.register, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          toast("please verify your email");
          navigate("/public/otp", { state: { email } }); // Pass the email as state
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div>
    <div className="h-screen w-screen bg-cover bg-no-repeat register-backgroundimage">
      <div className="h-full w-full md:bg-transparent bg-white/20">
        <div>
          <RegisterHeadder />
        </div>
        <form className="md:px-0 px-4 md:pt-0 pt-1" onSubmit={handleSubmit}>
          <div className="lg:ml-[60%] bg-white/70 shadow-md rounded-3xl pt-10 pb-12 px-8 mt-5 w-full md:w-3/4 lg:w-[375px] h-600 overflow-auto">
            <div className="flex gap-[75px]">
              <h2 className="text-4xl font-bold">Sign up</h2>
              <div className="flex-col">
                <img className="h-14 w-14 rounded-full ml-4" src={profile} />
                <label htmlFor="avatar" className="block cursor-pointer rounded-md">
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleimage}
                  />
                  <span className="text-black font-bold hover:text-red-700">Choose Avatar</span>
                </label>
              </div>
            </div>
            <div>
              <div className="text-sm text-black font-semibold mb-1">
                <p>Enter your email</p>
              </div>
              <input
                onChange={changeEmail}
                placeholder="Email address"
                name="email"
                className="text-[14px] block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex space-x-2">
              <div>
                <div className="text-sm text-black font-semibold mt-3 mb-1">
                  <p>Enter your name</p>
                </div>
                <input
                  onChange={changeName}
                  placeholder="User Name"
                  type="text"
                  name="name"
                  className="text-[14px] block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <div className="text-sm text-black font-semibold mt-3 mb-1">
                  <p>Enter your age</p>
                </div>
                <input
                  onChange={changeAge}
                  placeholder="Age"
                  type="number"
                  name="age"
                  className="text-[14px] block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-black font-semibold mt-3 mb-1">
                <p>Enter your password</p>
              </div>
              <div className="flex items-center relative">
                <input
                  onChange={changePassword}
                  placeholder="Password"
                  name="password"
                  type={type}
                  className="block w-full px-4 py-2 text-[14px] rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
                <div className="absolute right-3 cursor-pointer" onClick={handleEye}>
                  {eye === 1 ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
                </div>
              </div>
              <p
                className={`text-sm mt-1 ${
                  passwordStrength.color === "red"
                    ? "text-red-700"
                    : passwordStrength.color === "orange"
                    ? "text-orange-500"
                    : passwordStrength.color === "green"
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                {passwordStrength.strength}
              </p>
            </div>
            <p className="text-red-700 text-xs">{error}</p>
            <div className="flex-col ml-[200px] my-2">
              <p className="text-[13px]">Have an account?</p>
              <a href="/public/login" className="text-[13px] text-black hover:text-red-700">
                Sign in
              </a>
            </div>
            <div>
              <button
                className="block w-full px-4 py-2 rounded-md bg-red-700 text-white font-medium hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Register;
