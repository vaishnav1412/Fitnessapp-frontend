import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import instance from "../../Axios/axiosConfig";
import { apiEndPoints } from "../../util/api";
const Joinroom = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const getDatas = async () => {
    try {
      const response = await instance.post(apiEndPoints.findRoomIds);
      if (response.data.success) {
        setRoom(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);
  return (
    <div className="bg-white w-full py-2 md:h-[650px] h-auto flex md:flex-row flex-col">
    <form className="flex flex-col md:w-1/2 w-full bg-white justify-center items-center md:px-0 px-3 md:py-0 py-6 max-w-[95%] mx-auto">
      <h2 className="text-3xl mb-3 font-semibold text-black">Instructions</h2>
      <div>
        <ul className="list-disc pl-5 text-black">
          <li>Respect and courtesy towards other users during video calls.</li>
          <li>Keep the conversation on-topic and related to herbal nutrition, weight loss, and health.</li>
          <li>Do not engage in spamming or self-promotion during the video call sessions.</li>
          <li>Respect the privacy and confidentiality of all participants in the video call.</li>
          <li>Maintain professionalism when seeking or providing advice or information.</li>
          <li>Adhere to all applicable laws and regulations while participating in video calls.</li>
          <li>Provide constructive feedback to help us improve our video call services.</li>
        </ul>
      </div>
    </form>
  
    <div className="md:w-1/2 w-full md:h-full h-auto bg-black flex justify-center md:rounded-bl-full rounded-none md:py-0 py-6 ">
      <div className="text-white md:mt-28 mt-4 text-center md-px-0 px-2">
        <h3 className="text-lg font-bold mb-2">Join Room</h3>
        <p className="text-base font-normal mb-2">
          Room id will be given below. Use the Room id to enter the room.
        </p>
        <div className="w-full">
          <button
            onClick={() => {
              navigate(`/user/videocall/${room}`);
            }}
            className="text-white bg-red-600 py-[6px] w-[110px] mb-2 md:w-[130px] rounded-3xl border-2 border-white"
          >
            JOIN NOW
          </button>
        </div>
        <button
          onClick={() => {
            navigate("/user/appoinment");
          }}
          className="text-white bg-green-600 py-[6px] w-[110px] mb-2 md:w-[130px] rounded-3xl border-2 border-white"
        >
          Back
        </button>
      </div>
    </div>
  </div>
  
  
  );
};

export default Joinroom;
