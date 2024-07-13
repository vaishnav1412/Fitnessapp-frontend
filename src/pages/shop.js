import React from "react";
import Shops from "../components/Shop/shop";
import Headder from "../components/Headder2/Headder2";
import Footer from "../components/Footer.js/footer";
import "./shop.css"
const Shop = () => {
  return (
    <div className="bg-black h-full w-screen">
      <Headder />
      <Shops />
      <Footer />
    </div>
  );
};

export default Shop;
