import React, { useEffect, useState } from "react";
import "./bmi.css";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import instance from "../../Axios/axiosConfig";
import { apiEndPoints } from "../../util/api";
import Headder from "../Headder2/Headder2";

const Bmi = () => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [user, setUser] = useState("");

  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await instance.post(apiEndPoints.userProfileDetails);
      setUser(response.data.data);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong...");
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const id = user._id;

  const calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
      if (weight === 0) setError("Please enter a valid weight");
      if (height === 0) setError1("Please enter a valid height");
    } else {
      const bmiValue = (weight / (height * height)) * 10000;
      setBmi(bmiValue.toFixed(2));

      if (bmiValue < 23) {
        setMessage({ text: "You are under weight...", color: "yellow" });
      } else if (bmiValue >= 23 && bmiValue < 27) {
        setMessage({ text: "You are a healthy weight...", color: "green" });
      } else if (bmiValue >= 27 && bmiValue < 31) {
        setMessage({ text: "You are overweight...", color: "orange" });
      } else if (bmiValue >= 31 && bmiValue < 36) {
        setMessage({ text: "You are obese...", color: "red" });
      } else {
        setMessage({ text: "You are extremely obese...", color: "red" });
      }
    }
  };

  const updatebmi = async () => {
    const formData = {
      bmi,
      id,
    };

    const response = await instance.post(apiEndPoints.saveBmi, formData);

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Something went wrong...");
    }
  };

  useEffect(() => {
    if (bmi) {
      updatebmi();
    }
  }, [bmi]);

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="bg-black min-h-screen">
      <Headder />
      <div className="flex items-center justify-center border-y-8 border-white md:py-6 py-16">
        <div className="bg-gradient-to-bl from-gray-800 to-gray-500 w-full md:w-[900px] h-auto md:h-[500px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex items-center justify-center p-4">
            <div className="text-center md:text-left">
              <h2 className="text-red-700 font-bold text-6xl md:text-8xl">BMI</h2>
              <h2 className="text-red-700 font-medium text-lg mt-2">Body Mass Index</h2>
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <form className="w-full max-w-sm md:max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl flex flex-col bg-white/30 px-4 py-8 border-8 rounded-xl border-white/20" onSubmit={calcBmi}>
              <div className="flex flex-col mb-4">
                <h2 className="text-xl font-bold mb-4">Calculate your BMI</h2>
                <div className="flex flex-col my-2">
                  <label className="my-0">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="Enter your height"
                    className="w-full outline-none border-b-2 border-black px-2 py-1"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                  />
                  {error1 && <p className="text-red-500">{error1}</p>}
                </div>
                <div className="flex flex-col mt-2 mb-4">
                  <label className="text-xs my-0">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="Enter your weight"
                    className="w-full outline-none border-b-2 border-black px-2 py-1"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div>
                  <button className="block bg-red-700 w-full py-1 shadow-inner hover:bg-red-900" type="submit">
                    Calculate
                  </button>
                  <button className="block bg-black text-white w-full py-1 mt-2" type="button" onClick={reload}>
                    Reload
                  </button>
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-4">
                <p>Your BMI :</p>
                <p>{bmi}</p>
              </div>
              {message && <p className={`text-${message.color}-500`}>{message.text}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bmi;
