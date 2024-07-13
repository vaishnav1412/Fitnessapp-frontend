import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import instance from "../../Axios/axiosConfig";
import { apiEndPoints } from "../../util/api";

const Workout = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const getData = async () => {
    dispatch(showLoading());
    instance
      .post(apiEndPoints.workouts)
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.success) {
          setMenu(response.data.data);
        } else {
          toast("something went worng");
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error("something went worng...");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-[653px] w-full bg-white/90 pb-6 pt-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-2 border-black px-2 py-5">
        {menu.slice(0, showAll ? menu.length : 8).map((item, index) => (
          <div className="flex justify-center" key={index} style={{ overflowY: "auto" }}>
            <iframe
              width="400"
              height="230"
              src={item.link}
              title="HTML & CSS - How to Embed a YouTube Video in Your Website"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-lg"
        >
          {showAll ? 'Show Less' : 'See All'}
        </button>
      </div>
    </div>

  );
};

export default Workout;
