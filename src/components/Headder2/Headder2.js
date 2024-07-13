import React, { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiEndPoints } from "../../util/api";
import "./headder.css";
import instance from "../../Axios/axiosConfig";
const logo = require("../../assets/other/f89dface-07b2-48f7-91fc-e563eeddda33-removebg-preview.png");
const Headder = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  let [user, setUser] = useState("");
  let [profile, setProfile] = useState("Profie");
  const id = user._id;

  const fetchUserDetails = async () => {
    try {
      instance
        .post(apiEndPoints.userProfileDetails)
        .then((response) => {
          setUser(response.data.data);
          setProfile(response.data.data.name);
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const navigateBmi = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/bmi");
      } else {
        navigate("/user/premiumuser");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shopNavigation = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/shop");
      } else {
        navigate("/user/premiumuser");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateAppoinment = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/appoinment");
      } else {
        navigate("/user/premiumuser");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateFitness = async () => {
    try {
      const formData = {
        id,
      };
      const response = await instance.post(apiEndPoints.primecheck, formData);
      if (response.data.success) {
        navigate("/user/fitness");
      } else {
        navigate("/user/premiumuser");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upgrade = () => {
    navigate("/user/premiumuser");
  };

  const handleClick = () => {
    setClick(!click);
  };

  const content = (
    <>
      <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-white opacity-1 z-50 transition">
        <ul className="text-center text-xl p-20 overflow-y-scroll">
          <li
            onClick={() => {
              navigate("/user/home");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            HOME
          </li>
          <li
            onClick={() => {
              navigate("/user/contactus");
            }}
            className="my-4 py-4 border-b-2 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            CONTACT US
          </li>

          <li
            onClick={() => {
              shopNavigation();
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            SHOP
          </li>
          <li
            onClick={() => {
              navigateBmi();
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            BMI
          </li>
          <li
            onClick={() => {
              navigateAppoinment();
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            APPOINMENT
          </li>
          <li
            onClick={() => {
              navigateFitness();
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            FITNESS
          </li>
          <li
            onClick={() => {
              navigate("/user/notification");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            NOTIFICATION
          </li>
          <li
            onClick={() => {
              navigate("/user/userprofile");
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-black text-white mb-1  cursor-pointer"
          >
            PROFILE
          </li>
          <li
            onClick={() => {
              upgrade();
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-orange-500 text-white mb-1  cursor-pointer"
          >
            UPGRADE
          </li>
          <li
            onClick={() => {
              logout();
            }}
            className="my-4 py-4 border-b-4 border-red-700 bg-red-500 text-white  cursor-pointer"
          >
            LOGOUT
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div className="h-8vh flex justify-between bg-none z-50 text-white lg:py-5 px-10 py-4 flex-1">
        <div className="h-11 w-40 md:-mt-0 -mt-2">
          <img src={logo} />
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-3 text-[14px]">
              <li
                onClick={() => {
                  navigate("/user/home");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                HOME
              </li>
              <li
                onClick={() => {
                  navigate("/user/contactus");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                CONTACT US
              </li>
              <li
                onClick={() => {
                  shopNavigation();
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                SHOP
              </li>
              <li
                onClick={() => {
                  navigateBmi();
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                BMI
              </li>
              <li
                onClick={() => {
                  navigateAppoinment();
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                APPOINMENT
              </li>
              <li
                onClick={() => {
                  navigateFitness();
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                FITNESS
              </li>
              <li
                onClick={() => {
                  navigate("/user/notification");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                NOTIFICATION
              </li>
              <li
                onClick={() => {
                  navigate("/user/userprofile");
                }}
                className="hover:text-red-700 transition border-b-2 border-transparent  hover:border-red-700 cursor-pointer"
              >
                {" "}
                {profile.toUpperCase()}
              </li>

              <li
                className="-mt-[4px]"
                onClick={() => {
                  upgrade();
                }}
              >
                <button class="Btn">SUBSCRIBE</button>
              </li>
              <li
                onClick={() => {
                  logout();
                }}
                className="transition cursor-pointer"
              >
                <button class="Btn-2">
                  <div class="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div class="texts">Logout</div>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div>{click && content}</div>
        <button
          className="block sm:hidden transition text-white "
          onClick={handleClick}
        >
          {click ? <FaTimes /> : <LuMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Headder;
