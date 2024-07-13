import React from "react";

import Headder from "../components/Headder2/Headder2";
import Contact from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer.js/footer";
const ContactUs = () => {
  return (
    <div>
      <div className=" w-full h-full bg-black">
        <Headder />
        <div>
          {" "}
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
