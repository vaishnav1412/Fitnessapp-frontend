import React from "react";
import Food from "../components/Food/Food";
import Headder from "../components/Headder2/Headder2";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"

const Foods = () => {
  return (
    <div>
      <div className="bg-cover userprofile">
      <Headder />
      <Food />
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
