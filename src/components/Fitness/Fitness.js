import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import "./fitness.css";
import { useNavigate } from "react-router-dom";
const image1 = require("../../assets/other/fitness  diet bg.jpg");
const image2 = require("../../assets/other/1552690.jpg");
const   Fitness = () => {
  const [renderState, setRenderState] = useState(0);
  const navigate= useNavigate()
  return (
    <div className="w-full bg-white/90 md:h-[655px] h-auto pt-2">
    <div className="w-full h-16 flex">
      <div
        onClick={() => {
          setRenderState(0);
        }}
        className={`h-full w-1/2 bg-red-600 text-white text-center text-lg font-semibold pt-4 cursor-pointer ${
          renderState === 0 ? "border-2 border-black" : "border-none"
        }`}
      >
        WORKOUT SECTION
      </div>
      <div
        onClick={() => {
          setRenderState(1);
        }}
        className={`h-full w-1/2 bg-black text-white text-center text-lg font-semibold pt-4 cursor-pointer ${
          renderState !== 0 ? "border-2 border-red-600" : "border-none"
        }`}
      >
        DIET MANAGEMENT
      </div>
    </div>
  
    {renderState === 0 && (
      <div className="h-full w-full bg-white mt-2 flex flex-wrap md:flex-nowrap">
        <div className="bg-white w-full md:w-1/2 md:h-[575px] h-auto border-t-4 border-b-2 border-white md:block hidden">
          <img src={image1} className="h-full w-full rounded-ee-full" />
        </div>
        <div className="md:w-1/2 w-full md:h-[575px] h-auto px-4 md:px-6 py-8 md:py-12 flex-col">
          <div className="h-full w-full px-2 py-4 text-lg font-semibold text-slate-700">
            <div className="flex">
              <h2 className="mr-1">Transform Your</h2>
              <div className="text-red-600 mt-[7px]">
                <CiHeart />
              </div>
              <h2 className="mr-1">Health with</h2>
            </div>
            <div className="flex-col mt-4">
              <h2 className="text-4xl font-semibold text-black">
                Personalized Workout
              </h2>
              <h2 className="text-4xl font-semibold text-black">Sessions</h2>
            </div>
  
            <div className="py-8">
              <p className="text-base font-medium text-slate-700">
                Welcome to Herbal Nutrition, your partner in achieving peak
                performance through personalized training. Our certified trainers
                are here to guide you on your fitness journey, providing customized
                workout plans and ongoing support. Start your transformation today
                and experience the power of personalized training coaching.
              </p>
            </div>
  
            <div className="h-full w-full my-4">
              <button
                className="animated-button"
                onClick={() => {
                  navigate("/user/workouts");
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Click Here</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    {renderState !== 0 && (
      <div className="h-full w-full mt-2 flex flex-wrap md:flex-nowrap">
        <div className="bg-black md:block hidden w-full md:w-1/2 h-[575px] border-t-4 border-black border-b-white border-b-2">
          <img src={image2} className="h-full w-full rounded-ee-full" />
        </div>
        <div className="md:w-1/2 w-full md:h-[575px] h-auto px-4 md:px-6 py-8 md:py-12 flex-col bg-black border-b-2 border-white">
          <div className="h-full w-full px-2 py-4 text-lg font-semibold text-slate-700">
            <div className="flex">
              <h2 className="mr-1 text-slate-200">Transform Your</h2>
              <div className="text-red-100 mt-[7px]">
                <CiHeart />
              </div>
              <h2 className="mr-1 text-slate-200">Health with</h2>
            </div>
            <div className="flex-col mt-4">
              <h2 className="text-4xl font-semibold text-white">
                Personalized Diet
              </h2>
              <h2 className="text-4xl font-semibold text-white">Coaching</h2>
            </div>
  
            <div className="py-8">
              <p className="text-base font-medium text-slate-300">
                Welcome to Herbal Nutrition, your partner in achieving your health
                and wellness goals through personalized diet coaching. Our
                certified nutritionists are here to guide you on your journey,
                providing customized meal plans and ongoing support. Reach your
                full potential and experience the power of personalized diet
                coaching.
              </p>
            </div>
  
            <div className="h-full w-full my-4">
              <button
                className="animated-button"
                onClick={() => {
                  navigate("/user/foods");
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Click Here</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  
  
  );
};

export default Fitness;
