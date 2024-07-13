import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import instance from '../../Axios/axiosConfig';
import { apiEndPoints } from "../../util/api";

import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';

const Weightlose = () => {
    const[list,setList] = useState([])
    const dispatch = useDispatch()
   
    const fetchgain =async() =>{
      dispatch(showLoading())
      instance.post(apiEndPoints.fetchLose)
      .then((response) => {
        dispatch(hideLoading())
        if (response.data.success) {
          setList(response.data.data)
          toast.success(response.data.message);
        } else {
          dispatch(hideLoading())
          toast.error(response.data.message);
        }
       
      })
      .catch((error) => {
        dispatch(hideLoading())
        toast.error('something went worng...');
      });
    }
  
  
   useEffect(()=>{
      fetchgain()
   },[])
  return (
    <div className='p-3 bg-white/90 min-h-[653px]'>
     <div className="  mx-auto rounded-md sm:p-4 text-black bg-white p-3">
	<h2 className="mb-3 text-2xl font-semibold leadi text-center">Diet Plan For WeightLose</h2>

<div className="overflow-x-auto">
         <table class="min-w-full text-xs">
    <thead>
      <tr class="text-left border-b-4 border-white h-16  bg-black text-white text-base font-semibold">
        <th class="px-3 font-medium py-2">Day</th>
        <th class="px-3 font-medium py-2">Type and Time</th>
        <th class="px-3 py-2">Food</th>
      </tr>
    </thead>


    <tbody>
  {list.map((item, index) => {
    const isFirstSet = Math.floor(index / 5) % 2 === 0;
    const backgroundColorClass = isFirstSet
    ? "dark:bg-slate-200"
      : "bg-gray-200 dark:bg-gray-400";

    return (
      <tr
        key={index}
        className={`text-left border-b-2 border-opacity-20 dark:border-white ${backgroundColorClass}`}
      >
        <td class="px-3 font-medium py-2">{item.day}</td>
        <td class="px-3 font-medium py-2">
          <div class="flex flex-col">
            <span class="mb-1">{item?.type}</span>
            <span class="text-gray-500">({item?.time})</span>
          </div>
        </td>
        <td class="px-3 py-2">
          <div class="flex items-center">
            <span class="ml-2">{item?.foods}</span>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
  </table>
  </div>


</div>
    </div>
  )
}

export default Weightlose
 