import React from "react";
import "./Home.css"
import Headder2 from "../components/Headder2/Headder2";
import Banner from "../components/Banner/banner";
import Footer from "../components/Footer.js/footer";
import HomeContent1 from "../components/HomeContent1/HomeContent1";
import HomeContent2 from "../components/HomeContent2/HomeContent2";

const Home2 = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-screen w-screen bg-cover bg-no-repeat  home-backgroundimage">
        <div className="md:bg-transparent bg-black">
          <Headder2 />
        </div>
       
        </div>
        <div className=" h-4 w-full bg-white"></div>
        <div>
         <HomeContent1/>
        </div>
        <div>
          <Banner/>
        </div>
        
        <div>
          <HomeContent2/>
        </div>
        <div>
            <div className="h-4 w-full bg-white" >

            </div>
            <Footer/>
        </div>
    </div>
  );
};

export default Home2;
