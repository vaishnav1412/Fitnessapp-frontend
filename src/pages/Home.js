import React from "react";
import "./Home.css";
import Headder from "../components/Headder/headder";
import Banner from "../components/Banner/banner";
import Footer from "../components/Footer.js/footer";

import HomeContent1 from "../components/HomeContent1/HomeContent1";
import HomeContent2 from "../components/HomeContent2.1/HomeContent";
const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-screen w-screen bg-cover bg-no-repeat  home-backgroundimage">
        <div className="">
          <Headder />
        </div>
      </div>
      <div className=" h-4 w-full bg-white"></div>
      <div>
        <HomeContent1 />
      </div>
      <div>
        <Banner />
      </div>
      
      <div>
        <HomeContent2 />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
