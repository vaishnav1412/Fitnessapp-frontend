import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import instance from "../../Axios/axiosConfig";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";
import "./Banner.css"; // Ensure to add any custom styles if needed

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      if (localStorage.getItem("token")) {
        const response = await instance.post(apiEndPoints.bannerList);
        dispatch(hideLoading());
        if (response.data.data) {
          setBanner(response.data.data);
        } else {
          toast("Something went wrong");
        }
      } else {
        const response = await axios.post(apiEndPoints.bannerList2);
        dispatch(hideLoading());
        if (response.data.data) {
          setBanner(response.data.data);
        } else {
          toast("Something went wrong");
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching banner data:", error);
      toast.error("An error occurred while fetching banner data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative flex gap-4 pt-5 md:pb-2 pb-5 overflow-x-scroll scrollbar-hidden">
        {banner.map((items, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-auto">
            <img
              className="h-48 aspect-video rounded-sm object-cover w-full md:w-auto"
              src={`http://localhost:3001/upload/${items?.image}`}
              alt={`Banner ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
