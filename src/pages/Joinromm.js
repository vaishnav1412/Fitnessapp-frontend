import React from "react";
import Headder from "../components/Headder2/Headder2";
import Joinroom from "../components/Joinroom/Joinroom";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const Joinromm = () => {
  return (
    <div>
      <div className=" bg-black">
        <Headder />
        <div>
          <Joinroom/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Joinromm;
