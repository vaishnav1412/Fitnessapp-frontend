import React from "react";
import Headder from "../components/Headder2/Headder2";
import UserOrder from "../components/UserOrder/UserOrder";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const OrderHistory = () => {
  return (
   <div>
     <div className="userprofile bg-cover" >
      <Headder />
     <div className="bg-white/70">
     <UserOrder />
     </div>
    </div>
     <Footer/>
   </div>
  );
};

export default OrderHistory;
