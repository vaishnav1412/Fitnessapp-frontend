import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { apiEndPoints } from "../../util/api";
import axios from "axios";
const VideoCall = () => {
  const [user, setUser] = useState("");
  const { roomId } = useParams();
  const videoContainerRef = useRef(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(
        apiEndPoints.userProfileDetails,
        {},
        {
          headers: {
            Authorisation: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const initVideoCall = async () => {
      const appID = 1467092061;
      const serverSecret = "31380ee515a8878f3967d5a0c3f2745b";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "vaishnav"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: videoContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
      });
    };

    initVideoCall();
  }, [roomId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
    
      <div
        ref={videoContainerRef}
        className="w-full max-w-4xl h-full py-16 bg-black shadow-md rounded-lg overflow-hidden"
      />
    
  </div>
  );
};

export default VideoCall;
