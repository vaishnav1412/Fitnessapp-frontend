import React from "react";
import Headder from "../components/Headder2/Headder2";
import Weightlose from "../components/WeightLose/weightlose";
import Footer from "../components/Footer.js/footer";
import "./Carts"
const Weightloses = () => {
  return (
    <div>
      <div className="bg-cover userprofile">
        <Headder />
        <Weightlose />
      </div>
      <Footer />
    </div>
  );
};

export default Weightloses;
