import React, { useEffect, useState } from "react";
import "./HomeContent1.css";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { apiEndPoints } from "../../util/api";
const photo = require('../../assets/other/Rectangle 3.png')
const HomeContent1 = () => {
 const navigate = useNavigate()
 const [user,setUser] = useState("")

 const fetchUserDetails = async () => {
  try {
    const response = await instance.post(apiEndPoints.userProfileDetails);
    setUser(response.data.data);
  } catch (error) {
    console.error("Error fetching user details", error);
  }
};


 useEffect(()=>{
fetchUserDetails()
 },[])
  const navigation =()=>{

    if(localStorage.getItem("token")){
          navigate("/user/fitness")
    }else{
         navigate('/public/login')
    }
  }


console.log("userDetails",user);
  return (
    <div className="w-screen md:h-[50vh] h-[650px] bg-black flex flex-col md:flex-row">
  <div className=" sm:w-1/2 md:h-[50vh] h-[300px]">
    <img src={photo} className="h-full w-full" alt="Fitness" />
  </div>

  <div className="h-[50vh] w-full sm:w-1/2 px-6 py-3 flex flex-col justify-center">
    <div className="h-[18vh] w-full border-l-4 border-red-700">
      <div className="flex-col px-4">
        <div className="text-left text-white font-bold text-4xl px-3">
          <p>ARE YOU READY TO</p>
        </div>
        <div className="text-left text-white font-bold text-4xl px-3">
          <p>GET IN SHAPE</p>
        </div>
      </div>
    </div>
    <div className="h-[17vh] w-full py-1 mt-3">
      <p className="font-semibold p-0 m-0 text-slate-400">
        Being Physically Active Can Improve Your Brain Health, Help Manage Weight.
      </p>
      <p className="font-semibold p-0 m-0 text-slate-400">
        Reduce The Risk Of Disease, Strengthen Bones And Muscles, And Improve Your
      </p>
      <p className="font-semibold p-0 m-0 text-slate-400">
        Ability To Do Every Activity. Adults Who Si
      </p>
    </div>
    <div className="mt-auto">
      <button onClick={()=>{
        navigation()
      }} className="bg-red-700 text text-white font-medium py-1 px-3 hover:bg-red-900">
        Join Now
      </button>
    </div>
  </div>



</div>

  );
};

export default HomeContent1;
