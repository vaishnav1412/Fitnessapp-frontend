import React from "react";
import Headder from "../components/Headder2/Headder2";
import Workout from "../components/Workout/Workout";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const Workouts = () => {
  return (
    <div>
     <div className="bg-black">
     <Headder />
      <Workout />
      </div>
      <Footer />
    </div>
  );
};

export default Workouts;
