import React, { useEffect, useState } from "react";
import "../HomeContent2/HomeContent2.css";
import axios from "axios";
import { apiEndPoints } from "../../util/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomeContent2 = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  console.log(products, 'hai');

  const getData = async () => {
    try {
      const response = await axios.post(`http://localhost:3001${apiEndPoints.userfetchProducts2}`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = () => {
    navigate('/public/login');
  };

  return (
    <div className="relative w-full flex flex-col p-3 bg-black">

    <div className="text-white font-bold text-3xl mx-3 px-8 py-1">
      <p>Popular Products</p>
    </div>
  
    <div className="p-4 flex gap-4 overflow-x-auto justify-between">
      {products.map((product, index) => (
        <div key={index} className="flex-shrink-0 flex w-full md:max-w-xs flex-col rounded-lg border border-gray-100 bg-white shadow-md shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all">
          <div className="relative mx-2 mt-3 flex h-60 overflow-hidden rounded-xl">
            <img onClick={() => { navigate('/public/login') }} className="object-cover w-full" src={`http://localhost:3001/upload/${product?.image}`} alt="product image" />
          </div>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">${product?.price}</span>
                <span className="text-sm text-slate-900 line-through">${product?.sellingPrice}</span>
              </p>
              <div className="flex items-center">
                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {/* Add more rating stars if needed */}
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button onClick={() => { addToCart(product?._id) }} className="flex items-center justify-center rounded-md bg-red-600 hover:animate-bounce px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default HomeContent2;
