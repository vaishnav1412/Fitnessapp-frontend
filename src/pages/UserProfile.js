import React from "react";
import Headder from "../components/Headder2/Headder2";
import UserProfiles from "../components/UsersProfile/userProfile"
import Footer from "../components/Footer.js/footer";

const UserProfile = () => {
  return (
    <div>
      <div className="bg-black">
      <Headder />
    </div>
    <div>
    <UserProfiles />
    </div>
    <div>
    <Footer/>
    </div>
    </div>
  );
};

export default UserProfile;
