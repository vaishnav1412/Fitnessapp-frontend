import React from "react";
import Headder from "../components/Headder2/Headder2";
import Checkout from "../components/Checkout/Checkout";
import Footer from "../components/Footer.js/footer";

const Checkouts = () => {
  return (
    <div >
      <div className="bg-black">
        <Headder />
        <Checkout />
      </div>
      <Footer />
    </div>
  );
};

export default Checkouts;
