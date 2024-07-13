import React from "react";
import { useNavigate } from "react-router-dom";
import "./food.css";
const image1 = require("../../assets/other/weightgainimage.jpg");
const image2 = require("../../assets/other/weightloseimage.jpg");
const Food = () => {
  const navigate = useNavigate();

  const gainWeight = () => {
    navigate("/user/weightgain");
  };

  const loseWeight = () => {
    navigate("/user/weightlose");
  };

  return (
    <div className="p-3 bg-white/70">
      <section className="bg-black text-white mb-3">
        <div className=" flex flex-col mx-auto lg:flex-row">
          <div className="w-full lg:w-1/3 p-3">
            <img className="h-full w-full" src={image2} />
          </div>
          <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 mb-8 text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-3xl font-semibold leadi">
              Foods to weight lose
            </h2>
            <p className="mt-4 mb-8 text-sm">
              Herbal Nutrition food formula for weight lose .This will help you
              to fast relief from over weight
            </p>
            <button
              class="learn-more"
              onClick={() => {
                loseWeight();
              }}
            >
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">GET STARTED</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-black dark:text-white">
        <div className=" flex flex-col mx-auto lg:flex-row">
          <div className="w-full lg:w-1/3 p-3">
            <img className="h-full w-full" src={image1} />
          </div>
          <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 mb-8 dark:text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-3xl font-semibold leadi">
              Foods to gain weight
            </h2>
            <p className="mt-4 mb-8 text-sm">
              Herbal Nutrition food formula for weight gain .This will help you
              to imporove your weight{" "}
            </p>
            <button
              class="learn-more "
              onClick={() => {
                gainWeight();
              }}
            >
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">GET STARTED</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Food;
