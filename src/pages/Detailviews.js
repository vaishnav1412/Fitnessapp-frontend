import React from "react";
import Headder from "../components/Headder2/Headder2";
import Detailview from "../components/ProductDetailView/Detailview";
import Footer from "../components/Footer.js/footer";
const Detailviews = () => {
  return (
    <div className=" bg-black">
      <Headder />
      <Detailview />
      <Footer/>
    </div>
  );
};

export default Detailviews;
