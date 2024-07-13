import React from "react";
import Headder from "../components/Headder2/Headder2";
import Ordersuccess from "../components/Ordersuccess/Ordersuccess";
import "./Cart.css"
const OrderSuccessPage = () => {
  return (
    <div className=" bg-black">
      <Headder />
      <Ordersuccess />
    </div>
  );
};

export default OrderSuccessPage;
