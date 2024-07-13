import React from 'react'
import Headder from '../components/Headder2/Headder2'
import Footer from '../components/Footer.js/footer'
import Fitnesss from '../components/Fitness/Fitness'
import "./Cart.css"
const Fitness = () => {
  return (
    <div >
      <div className='bg-black h-full w-full'>
<Headder/>
<Fitnesss/>
      </div>
     
      <Footer/>
    </div>
  )
}

export default Fitness
