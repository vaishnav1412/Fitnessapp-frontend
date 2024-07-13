import React, { useEffect, useState } from "react";
import instance from "../../Axios/axiosConfig";
import { apiEndPoints } from "../../util/api";

const Subscriptions = () => {
  const [plan, setPlan] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchData = () => {
    try {
      instance
        .post(apiEndPoints.fetchSubscriptionHistory)
        .then((response) => {
          if (response.data.success) {
            setPlan(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatus = (purchaseDate, amount) => {
    const currentDate = new Date();
    const purchaseDateObj = new Date(purchaseDate);
    let validityDays;

    switch (amount) {
      case 399:
        validityDays = 30;
        break;
      case 799:
        validityDays = 90;
        break;
      case 1099:
        validityDays = 180;
        break;
      case 1799:
        validityDays = 360;
        break;
      default:
        validityDays = 0;
    }

    const expiryDate = new Date(purchaseDateObj);
    expiryDate.setDate(expiryDate.getDate() + validityDays);

    return currentDate > expiryDate ? 'EXPIRED' : 'ACTIVE';
  };

  return (
    <div className="h-full bg-white/70 w-full p-6">
      <div className="h-full w-full md:p-6 p-0 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
        <div className="h-full w-full flex-row">
          <div className="w-full h-16 flex bg-black justify-between md:px-6 px-2">
            <h2 className="text-white mt-5 text-lg font-bold">Subscription History</h2>
            <div 
              onClick={() => setShowAll(!showAll)}
              className="bg-white w-24 h-6 text-center mt-5 rounded-sm cursor-pointer border-b-2 border-transparent hover:border-red-600">
              {showAll ? "HIDE" : "SEE ALL"}
            </div>
          </div>
          <div className="h-auto w-full bg-white pt-3 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="w-full h-14 bg-gray-600 text-white">
                  <th>ORDER ID</th>
                  <th>AMOUNT</th>
                  <th>PURCHASE DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              {plan
                .slice()
                .reverse()
                .slice(0, showAll ? plan.length : 7)
                .map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr className="w-full h-16 text-center bg-black text-white border-t-2 border-white">
                        <td>{item.orderId.slice(-7)}</td>
                        <td>{item.amount}</td>
                        <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                        <td>{getStatus(item.purchaseDate, item.amount)}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
