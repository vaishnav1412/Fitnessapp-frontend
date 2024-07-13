import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { apiEndPoints } from "../../util/api";
import "./adminprofileuserside.css";

const AdminProfileUserSides = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const dispatch = useDispatch();
  const getData = async () => {
    dispatch(showLoading());
    const response = await instance.post(apiEndPoints.getAdminData);
    dispatch(hideLoading());
    if (response.data.success) {
      setAdmin(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    getData();
  },[]);

  return (
    <div className="md:h-[640px] h-auto w-full bg-white py-2 flex md:flex-row flex-col">
    <div className="md:w-1/2 w-full h-full flex justify-center bg-black text-white md:rounded-br-full">
      <div className="md:mt-28 mt-4 text-center p-4">
        <h3 className="text-lg font-bold mb-2">It's Time To Change</h3>
        <p className="mb-2 md:h-auto w-auto md:w-[500px] text-base font-normal">
          "Your body can withstand almost anything. It's your mind you have to convince."
        </p>
        <p className="text-base font-normal">
          "Believe you can and you're halfway there."
        </p>
        <p className="text-base font-normal text-yellow-500 mt-8">
          "Appoinment facility only avaliable mon-sat ,9am to 12pm only"
        </p>
      </div>
    </div>
  
    <div className="md:w-1/2 w-full h-full flex md:mt-0 mt-4 justify-center items-center">
      <form className="h-auto md:h-[350px] w-[300px] flex flex-col text-center">
        <h2 className="text-black text-3xl mb-5">Admin Details</h2>
  
        <div className="flex items-center justify-center mb-4">
          <div className="h-32 w-32 bg-black rounded-full p-2">
            <div className="h-full w-full bg-white rounded-full">
              <img
                src={`http://localhost:3001/upload/${admin[0]?.image}`}
                className="h-full w-full rounded-full"
                alt="Admin"
              />
            </div>
          </div>
        </div>
  
        <div className="flex flex-col my-3">
          <h2 className="text-center text-lg my-2 font-semibold text-black">
            {admin[0]?.name}
          </h2>
          <h2 className="text-center text-sm mb-2 font-medium text-slate-700">
            {admin[0]?.qulification}, ({admin[0]?.experience} Years)
          </h2>
          <button
            onClick={() => {
              navigate("/user/joinroom");
            }}
            className="py-2 bg-red-600 mx-2 text-white"
          >
            Connect
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AdminProfileUserSides;
