import React, { useState } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa6";
import { TbBrandDiscord } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { apiEndPoints } from "../../util/api";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState(0);
  const [Message, setMessage] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate();
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;
  
    setSelectedValues((selectedValues) => {
      if (checked && !selectedValues.includes(value)) {
        return [...selectedValues, value];
      } else if (!checked && selectedValues.includes(value)) {
        return selectedValues.filter((item) => item !== value);
      }
  
      return selectedValues;
    });
  };
  

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isVarified = true;

    if (FirstName === "") {
      toast.error("Please enter first name");
      isVarified = false;
    }
    if (LastName === "") {
      toast.error("Please enter last name");
      isVarified = false;
    }
    if (Email === "") {
      toast.error("Please enter Email");
      isVarified = false;
    }
    if (Phone.toString().length < 10) {
      toast.error("Please enter correct phone number");
      isVarified = false;
    }
    if (Message === "") {
      toast.error("Please enter message");
      isVarified = false;
    }
    if (selectedValues.length < 1) {
      toast.error("Please select atleast one subject");
      isVarified = false;
    }

    if (isVarified) {
      const formData = {
        FirstName,
        LastName,
        Email,
        Phone,
        selectedValues,
        Message,
      };

      try {
        const response = await axios.post(
          apiEndPoints.publicContactUs,
          formData
        );

        if (response.data.success) {
          navigate("/");
          toast.success(response.data.message);
        } else {
          toast.error("something went wrong");
        }
      } catch (error) {
        console.error("error form submitting", error);
      }
    }
  };
  return (
    <div className="md:h-[655px] h-full w-[100%] md:px-32 px-0 py-4 bg-black border-y-8 border-white">
    <div className="w-full md:h-20 h-24 flex align-middle justify-center text-center">
      <div>
        <h2 className="text-white md:text-4xl text-3xl font-bold">Contact Us</h2>
        <div className="flex gap-1 flex-col sm:flex-row">
          <h2 className="text-slate-300 sm:text-lg text-base font-semibold">Any question or remarks?</h2>
          <h2 className="text-slate-300 sm:text-lg text-sm font-semibold">Just write us a message!</h2>
        </div>
      </div>
    </div>

    <div className="w-full md:h-[523px] bg-white py-2 px-3 rounded-md flex md:flex-row flex-col">
      <div className="rounded-md bg-black h-full w-full md:w-2/5 px-8 py-6">
        <div className="flex-col">
          <h2 className="text-white md:text-3xl text-2xl md:text-left text-center">Contact Information</h2>
          <h2 className="text-slate-400 md:text-lg text-sm md:text-left text-center">Say something to start a live chat!</h2>

          <div className="flex md:justify-start md:flex-row align-middle justify-center flex-col md:items-start items-center md:mt-14 mt-3 gap-8">
            <div className="text-white mt-1">
              <FaPhoneVolume />
            </div>
            <h2 className="text-white md:text-left text-center">+1012 3456 789</h2>
          </div>
          <div className="flex md:justify-start md:flex-row align-middle justify-center flex-col md:items-start items-center md:mt-8 mt-3 gap-8">
            <div className="text-white mt-1">
              <AiOutlineMail />
            </div>
            <h2 className="text-white md:text-left text-center">www.herbalife45@gmail.com</h2>
          </div>
          <div className="flex md:justify-start md:flex-row align-middle justify-center md:items-start items-center flex-col md:mt-8 mt-3 gap-8">
            <div className="text-white mt-1">
              <GoLocation />
            </div>
            <div className="flex-col md:text-left text-center">
              <h2 className="text-white">132 Dartmouth street Baston,</h2>
              <h2 className="text-white">Massachusetts 02156 United States.</h2>
            </div>
          </div>

          <div className="flex gap-6 md:justify-start justify-center md:mt-[140px] mt-8">
            <div className="p-3 bg-slate-800 text-white rounded-full cursor-pointer">
              <SlSocialTwitter />
            </div>
            <div className="p-3 bg-white rounded-full text-black cursor-pointer">
              <FaInstagram />
            </div>
            <div className="p-3 bg-slate-800 text-white rounded-full cursor-pointer">
              <TbBrandDiscord />
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:w-3/5 w-full md:h-full md:p-8 p-4">
        <div className="h-full w-full bg-white">
          <form className="md:mb-5 mb-6" method="post">
            <div className="flex align-middle justify-center">
              <div className="flex md:space-x-2 md:gap-8 md:flex-row flex-col md:w-auto w-full">
                <div>
                  <div className="text-sm text-black font-semibold">
                    <p>First Name</p>
                  </div>
                  <input
                    onChange={(event) => handleFirstName(event)}
                    type="text"
                    name="name"
                    className="border-b-2 w-full solid border-black focus:outline-none"
                  />
                </div>
                <div>
                  <div className="text-sm text-black font-semibold">
                    <p>Last Name</p>
                  </div>
                  <input
                    onChange={(event) => handleLastName(event)}
                    type="text"
                    name="age"
                    className="border-b-2 solid border-black focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex align-middle justify-center mt-4">
              <div className="flex md:space-x-2 md:gap-8 md:flex-row flex-col md:w-auto w-full">
                <div>
                  <div className="text-sm text-black font-semibold">
                    <p>Email</p>
                  </div>
                  <input
                    onChange={(event) => handleEmail(event)}
                    type="email"
                    name="name"
                    className="border-b-2 solid border-black focus:outline-none w-full"
                  />
                </div>
                <div>
                  <div className="text-sm text-black font-semibold">
                    <p>Phone Number</p>
                  </div>
                  <input
                    onChange={(event) => handlePhone(event)}
                    type="tel"
                    name="age"
                    className="border-b-2 solid border-black focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex align-middle justify-left md:ml-[115px] mt-6">
              <div>
                <div className="text-sm text-black font-semibold">
                  <p className="font-bold">Select Subject?</p>
                </div>

                <div className="flex md:flex-row flex-col md:gap-3">
                  <div className="flex justify-between gap-3">
                    <div className="text-sm text-black font-semibold">
                      <p className="font-bold">Generals</p>
                    </div>
                    <div>
                      <input
                        checked={selectedValues.includes("Generals")}
                        onChange={handleChange}
                        value="Generals"
                        type="checkbox"
                        name="name"
                        className="border-b-2 solid border-black focus:outline-none"
                      />
                    </div>
                    <div className="text-sm text-black font-semibold">
                      <p className="font-bold">Weight gain</p>
                    </div>
                    <div>
                      <input
                        checked={selectedValues.includes("weightGain")}
                        value="WeightGain"
                        onChange={handleChange}
                        type="checkbox"
                        name="name"
                        className="border-b-2 solid border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-between">
                    <div className="text-sm text-black font-semibold">
                      <p className="font-bold">Products</p>
                    </div>
                    <div>
                      <input
                        checked={selectedValues.includes("Products")}
                        value="Products"
                        onChange={handleChange}
                        type="checkbox"
                        name="name"
                        className="border-b-2 solid border-black focus:outline-none"
                      />
                    </div>
                    <div className="text-sm text-black font-semibold">
                      <p className="font-bold">Weight loss</p>
                    </div>
                    <div>
                      <input
                        checked={selectedValues.includes("weightLoss")}
                        value="weightLoss"
                        onChange={handleChange}
                        type="checkbox"
                        name="name"
                        className="border-b-2 solid border-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex align-middle justify-center w-full">
              <div className="flex md:flex-row w-full">
                <div className="w-full md:ml-28 md:mr-28">
                  <div className="text-sm text-black font-semibold">
                    <p>Message</p>
                  </div>
                  <input
                    onChange={(event) => handleMessage(event)}
                    placeholder="Enter your message..."
                    type="text"
                    name="name"
                    className="border-b-2 solid border-black focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end mt-6">
              <button
                type="submit"
                onClick={(event) => handleSubmit(event)}
                className="bg-red-700 hover:bg-red-900 text-white px-6 py-2 rounded-sm md:mr-28"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ContactUs;
