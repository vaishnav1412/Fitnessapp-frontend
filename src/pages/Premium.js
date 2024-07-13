import React from 'react'
import Headder from '../components/Headder2/Headder2'
import Subscription from '../components/PremiumUser/Subscription'
import Footer from '../components/Footer.js/footer'
const Premium = () => {
   
  return (
    <div>
        <div className='w-full h-full bg-black'>
     <Headder/>
     <Subscription/>
    </div>
    <Footer/>
    </div>
  )
}

export default Premium
