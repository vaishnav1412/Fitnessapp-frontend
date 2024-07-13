import React from "react";
import Headder from "../components/Headder2/Headder2";
import AdminProfileUserSides from "../components/AdminProfileUserSide/AdminProfileUserSides";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const AdminProfileUserSide = () => {
  return (
    <div>
     <div className="bg-black">
     <Headder />
      <AdminProfileUserSides />
     </div>
      <Footer />
    </div>
  );
};

export default AdminProfileUserSide;
