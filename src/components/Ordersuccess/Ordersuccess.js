import React from 'react'

const Ordersuccess = () => {
  return (
    <div>
     
<div class=" h-screen">
      <div class=" p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div class="text-center">
            <h3 class=" text-5xl text-white font-bold text-center">Thank You</h3>
            <p class="text-white my-2">Your order #1233643 hasbeen placed!</p>
            <p className='text-slate-50'> Have a great day!  </p>
            <div
            className=" w-full flex align-middle justify-center"
            
          >
            <a  href="/user/shop" class="relative inline-flex mt-3 items-center justify-center w-[25%] px-6 py-2 overflow-hidden font-medium   rounded-lg bg-gradient-to-r  from-red-700 to-red-400 transition duration-300 ease-out border-2 border-red-900  shadow-2xl group">
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r rounded-md from-red-400 to-red-700 group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Continue Shopping
              </span>
              <span class="relative invisible">Continue Shopping</span>
            </a>
          </div>
           
        </div>
    </div>
  </div>
    </div>
  )
}

export default Ordersuccess
