import React from "react";
import Headder from "../components/Headder2/Headder2";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const Carts = () => {
  return (
   <div>
     <div className="bg-black" >
      <Headder />
      <Cart />
    </div>
<Footer/>
   </div>
  );
};

export default Carts;
