import React from 'react'

import Headder from "../components/Headder/headder";
import Contact from "../components/ContactUsPublic/ContactUs";
import Footer from "../components/Footer.js/footer";
const PublicContactUs = () => {
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
}

export default PublicContactUs
