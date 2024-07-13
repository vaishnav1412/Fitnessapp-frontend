import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../Axios/axiosConfig";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { apiEndPoints } from "../../util/api";
import { MdOutlineEdit } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";

const UserProfile = () => {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState("");
  const [renderState, setRenderState] = useState(0);

  const [type, setType] = useState("");
  const [houseName, setHouseName] = useState("");
  const [localArea, setLocalArea] = useState("");
  const [po, setPo] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");

  const [type1, setType1] = useState("");
  const [houseName1, setHouseName1] = useState("");
  const [localArea1, setLocalArea1] = useState("");
  const [po1, setPo1] = useState("");
  const [district1, setDistrict1] = useState("");
  const [pin1, setPin1] = useState("");
  const [addressId, setAddressId] = useState("");

  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const id = user._id;
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      instance
        .post(
          apiEndPoints.userProfileDetails,
          {},
          {
            headers: {
              Authorisation: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          dispatch(hideLoading());
          if (response.data.success) {
            setUser(response.data.data);
            setAddress(response.data.data2.addresses);
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
        });
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching user details", error);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("user", user._id);
      try {
        dispatch(showLoading());
        instance
          .post(apiEndPoints.userUploadImage, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            dispatch(hideLoading());

            if (response.data.success) {
              toast.success(response.data.message);
              fetchUserDetails();
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            dispatch(hideLoading());
            toast.error("something went worng...");
          });
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    }
  };

  useEffect(() => {
    uploadImage();
  }, [image]);

  const handleimage = async (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const upgrade = () => {
    navigate("/user/premiumuser");
  };


  const primeDetails = async () => {
    const formData = {
      id,
    };
    if (formData) {
      instance
        .post(apiEndPoints.planData, formData)
        .then((response) => {
          if (response.data.success) {
            setPlan(response.data.data);
          }
        })
        .catch((error) => {
          toast.error("something went worng...");
        });
    }
  };

  useEffect(() => {
    primeDetails();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    const originalDate = new Date(dateString);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  const getPlanType = (amount) => {
    switch (amount) {
      case 399:
        return "One Month Marvel";
      case 799:
        return "Thrilling Three";
      case 1099:
        return "Sensational Six";
      case 1799:
        return "Year of Wonder";
      default:
        return "Unknown Plan";
    }
  };

  const getRemainingDays = (endDate) => {
    const currentDate = new Date();
    const endDateObj = new Date(endDate);

    const diffTime = endDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const handletype = (event) => {
    setType(event.target.value);
  };
  const handleHouseName = (event) => {
    setHouseName(event.target.value);
  };
  const handleLocalArea = (event) => {
    setLocalArea(event.target.value);
  };
  const handlePo = (event) => {
    setPo(event.target.value);
  };
  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handlePin = (event) => {
    setPin(event.target.value);
  };

  const handletypeedit = (event) => {
    setType1(event.target.value);
  };
  const handleHouseNameedit = (event) => {
    setHouseName1(event.target.value);
  };
  const handleLocalAreaedit = (event) => {
    setLocalArea1(event.target.value);
  };
  const handlePoedit = (event) => {
    setPo1(event.target.value);
  };
  const handleDistrictedit = (event) => {
    setDistrict1(event.target.value);
  };
  const handlePinedit = (event) => {
    setPin1(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (type.length === 0) {
      toast.error("please enter valid type");
      isVarified = false;
    }
    if (houseName.length === 0) {
      toast.error("please enter valid housename");
      isVarified = false;
    }
    if (localArea.length === 0) {
      toast.error("please enter valid localarea");
      isVarified = false;
    }
    if (po.length === 0) {
      toast.error("please enter valid postoffice");
    }
    if (district.length === 0) {
      toast.error("please enter valid district");
    }
    if (pin <= 99999) {
      toast.error("please enter valid pin");
    }
    if (isVarified) {
      const formData = {
        type,
        houseName,
        localArea,
        po,
        district,
        pin,
        id,
      };
      try {
        const response = await instance.post(
          apiEndPoints.addCheckoutAddress,
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setRenderState(0);
          fetchUserDetails();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  const handleSubmitedit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (isVarified) {
      const formData = {
        type1,
        houseName1,
        localArea1,
        po1,
        district1,
        pin1,
        id,
        addressId,
      };
      try {
        const response = await instance.post(
          apiEndPoints.editCheckoutAddress,
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          fetchUserDetails();
          setRenderState(0);
        } else {
          toast.error(response.data.message);
          navigate("/user/checkout");
          setRenderState(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col gap-4 px-4 py-8 bg-black border-y-8 border-white">
      <div className="md:w-1/2 w-full flex align-middle justify-center">
        <div className="md:w-2/3 w-full bg-white dark:bg-white rounded-lg overflow-hidden shadow-md shadow-white">
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <img
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={`http://localhost:3001/upload/${user.image}`}
                alt="profile"
              />
              <div className="w-full flex justify-center">
                <label
                  className="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-2 py-2 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                  tabIndex="0"
                >
                  <span className="flex items-center space-x-2">
                    <svg
                      className="h-6 w-6 stroke-gray-400"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></path>
                      <path
                        d="M80,128a80,80,0,1,1,144,48"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></path>
                      <polyline
                        points="118.1 161.9 152 128 185.9 161.9"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></polyline>
                      <line
                        x1="152"
                        y1="208"
                        x2="152"
                        y2="128"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                      ></line>
                    </svg>
                    <span className="text-xs font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                  <input
                    id="photo-dropbox"
                    type="file"
                    className="sr-only"
                    onChange={handleimage}
                  />
                </label>
              </div>

              <div className="py-2">
               <div className="flex  justify-center w-full gap-2">
               <h3 className="font-bold text-2xl text-black  mb-1">
                  {user.name}
                </h3>
                <div className="mt-1" onClick={()=>{
                  navigate("/user/editprofile")
                }}>
                <CiEdit
                      style={{ fontSize: "28px" }}
                      className="text-blue-500"
                    />
                </div>
               </div>
                <h3 className="font-bold text-lg text-gray-600  mb-1">
                  Age:{user.age}
                </h3>
                <h3 className="font-bold text-base text-gray-600  mb-1">
                  {user.email}
                </h3>
                <div className="flex w-full justify-center gap-2">
                  <h3 className="font-bold text-lg text-black  mb-1">
                    BMI:{user.bmi}
                  </h3>
                  <div
                    onClick={() => {
                      navigate("/user/bmi");
                    }}
                  >
                    <CiEdit
                      style={{ fontSize: "28px" }}
                      className="text-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 px-2">
              <button
                onClick={() => {
                  navigate("/user/subscriptionhistory");
                }}
                className="flex-1 rounded-full bg-red-700 border-2 border-black  text-white   font-bold hover:bg-red-900  px-4 py-2"
              >
                Plan History
              </button>
              <button
                onClick={() => {
                  navigate("/user/orderhistory");
                }}
                className="flex-1 rounded-full border-2 border-black  font-semibold  text-white px-4 py-2 bg-red-700 hover:bg-red-900 "
              >
                Order History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex items-center gap-4 justify-center bg-white rounded-lg p-4">
        <div className="md:w-full w-full flex flex-col md:flex-row items-center gap-4 justify-center bg-white rounded-lg p-4">
          <div className="w-full md:w-full md:h-[250px] h-auto bg-white rounded-md shadow-lg mb-6 md:mb-0">
            <div className="h-full w-full flex flex-col items-center p-4">
              <h2 className="text-lg font-semibold mb-4">Plan Details</h2>
              <div className="w-full">
                <h2 className="text-gray-700">
                  Plan Starting Date : {formatDate(plan.startDate)}
                </h2>
                <h2 className="text-gray-700 mt-1">
                  Plan Ending Date : {formatDate(plan.endDate)}
                </h2>
                <h2 className="text-gray-700 mt-1">
                  Last Recharge : {plan.amount}
                </h2>
                <h2 className="text-gray-700 mt-1">
                  Current Plan : {getPlanType(plan.amount)}
                </h2>
                <h2 className="text-center text-xs text-slate-600 mb-2">
                  {getRemainingDays(plan.endDate)} days to go
                </h2>
                <div className="text-center">
                  <button
                    className="px-3 py-[2px] bg-red-600 rounded-lg text-white"
                    onClick={() => upgrade()}
                  >
                    EXTEND PLAN
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-11/12 md:h-[250px] h-auto bg-white rounded-md shadow-lg">
            {address.length === 0 ? (
              <div className=" h-full w-full flex justify-center items-center">
                <button
                  className="px-3 py-[2px] bg-red-600 h-fit rounded-lg text-white"
                  onClick={() => setRenderState(1)}
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div>
                <div className="w-full flex justify-between items-center p-4">
                  <h2 className="text-lg font-semibold">Primary Address</h2>
                  <div
                    onClick={() => {
                      setRenderState(2);
                      setAddressId(address[0]?._id);
                    }}
                  >
                    <FiEdit className="cursor-pointer" />
                  </div>
                </div>
                <div className="w-full px-4">
                  <h2 className="text-gray-700">Type: {address[0]?.type}</h2>
                  <h2 className="text-gray-700 mt-1">
                    House Name: {address[0]?.housename}
                  </h2>
                  <h2 className="text-gray-700 mt-1">
                    Local Area: {address[0]?.localarea}
                  </h2>
                  <h2 className="text-gray-700 mt-1">
                    Post Office: {address[0]?.postoffice}
                  </h2>
                  <h2 className="text-gray-700 mt-1">PIN: {address[0]?.pin}</h2>
                  <h2 className="text-gray-700 mt-1">
                    District: {address[0]?.district}
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={renderState === 0 || renderState === 2 ? "hidden" : ""}>
        <div class="bg-gray-500/60 h-[808px]  flex justify-center w-full items-center absolute md:-ml-[1400px] md:-mt-10 -mt-[870px] -ml-4">
          <div class="   bg-white/70 px-6 pt-5 pb-5 shadow-xl mx-auto w-[480px] -mt-36  border-slid border-2 rounded-md">
            <div class="mx-auto flex w-full  flex-col space-y-4">
              <div class="flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-5 w-full flex justify-end">
                  <ImCancelCircle
                    onClick={() => {
                      setRenderState(0);
                    }}
                  />
                </div>
                <div class="font-semibold text-5xl">
                  <p>Add Address</p>
                </div>
              </div>

              <div>
                <div>
                  <form method="post" onSubmit={handleSubmit}>
                    <div class="flex flex-col space-y-5">
                      <div class=" mx-auto w-full max-w-xl">
                        <div class="w-full  ">
                          <input
                            onChange={handletype}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            placeholder="Enter address type"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleHouseName}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your house name"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleLocalArea}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your local area"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handlePo}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your post office"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleDistrict}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                              placeholder="Enter your district"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mx-auto w-full max-w-xl">
                        <div class="w-full ">
                          <input
                            onChange={handlePin}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="number"
                            placeholder="Enter your pincode"
                          />
                        </div>
                      </div>

                      <div class="flex flex-col ">
                        <div>
                          <button
                            type="submit"
                            class="flex  flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-600 border-none hover:bg-red-700 text-white text-md shadow-lg my-3"
                          >
                            Add Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={renderState === 0 || renderState === 1 ? "hidden" : ""}>
        <div class="bg-gray-500/60 h-[518px] flex justify-center w-full items-center absolute md:-ml-[1400px] md:-mt-10 -mt-[1060px] ">
          <div class="   bg-white/70 px-6 pt-5 pb-5 shadow-xl mx-auto w-[480px]   border-slid border-2 rounded-md">
            <div class="mx-auto flex w-full  flex-col space-y-4">
              <div class="flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-5 w-full flex justify-end">
                  <ImCancelCircle
                    onClick={() => {
                      setRenderState(0);
                    }}
                  />
                </div>
                <div class="font-semibold text-5xl">
                  <p>Edit Address</p>
                </div>
              </div>

              <div>
                <div>
                  <form method="post" onSubmit={handleSubmitedit}>
                    <div class="flex flex-col space-y-5">
                      <div class=" mx-auto w-full max-w-xl">
                        <div class="w-full  ">
                          <input
                            defaultValue={address[0]?.type}
                            onChange={handletypeedit}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              onChange={handleHouseNameedit}
                              defaultValue={address[0]?.housename}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              defaultValue={address[0]?.localarea}
                              onChange={handleLocalAreaedit}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-3">
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              defaultValue={address[0]?.postoffice}
                              onChange={handlePoedit}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="mx-auto w-full max-w-xl">
                          <div class="w-full ">
                            <input
                              defaultValue={address[0]?.district}
                              onChange={handleDistrictedit}
                              class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mx-auto w-full max-w-xl">
                        <div class="w-full ">
                          <input
                            defaultValue={address[0]?.pin}
                            onChange={handlePinedit}
                            class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-3 outline-none rounded-md border border-gray-200 text-base shadow-md  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="number"
                          />
                        </div>
                      </div>

                      <div class="flex flex-col ">
                        <div>
                          <button
                            type="submit"
                            class="flex  flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-600 border-none hover:bg-red-700 text-white text-md shadow-lg my-3"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
