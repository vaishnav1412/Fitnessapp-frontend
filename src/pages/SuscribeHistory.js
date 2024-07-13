import React from 'react'
import Headder from "../components/Headder2/Headder2";
import Footer from '../components/Footer.js/footer';
import Subscriptions from '../components/UserSideSubscriptionHistory/Subscriptions';

const SuscribeHistory = () => {
  return (
    <div>
    <div className='bg-black'>
    <Headder/>
      <Subscriptions/>
    </div>
    <Footer/>
    </div>
  )
}

export default SuscribeHistory
