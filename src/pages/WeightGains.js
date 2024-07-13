import React from "react";
import Weightgain from "../components/weightGain/weightgain";
import Headder from "../components/Headder2/Headder2";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const WeightGains = () => {
  return (
    <div>
      <div className="bg-cover userprofile">
      <Headder />
      <Weightgain />
    </div>
    <Footer/>
    </div>
  );
};

export default WeightGains;
