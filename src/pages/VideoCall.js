import React from "react";
import VideoCalls from "../components/VideoCallUserUi/VideoCall";
import Headder from "../components/Headder2/Headder2";
import Footer from "../components/Footer.js/footer";
import "./Cart.css"
const VideoCall = () => {
  return (
    <div>

      <div className="bg-black">
      <Headder />
      </div>

   <div className="w-full h-screen ">
  
      <VideoCalls />
   </div>
    <div>
    <Footer/>
    </div>
   
    </div>
  );
};

export default VideoCall;
