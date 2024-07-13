import React from "react";
import Headder from "../components/Headder2/Headder2";
import Notifications from "../components/Notifications/Notifications";
import Footer from "../components/Footer.js/footer";
import "./Carts"
const Notification = () => {
  return (
   <div>
     <div className="bg-black" >
      <Headder />
      <Notifications />
    </div>
    <Footer/>
   </div>
  );
};

export default Notification;
