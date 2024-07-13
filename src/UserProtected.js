import React from 'react'
import {Routes,Route} from 'react-router-dom';
import ProtectedRoute from './protect/protectedRoute';
import UserProfile from './pages/UserProfile';

import EditProfile from './pages/EditProfile';
import Premium  from "./pages/Premium"
import WeightGains from './pages/WeightGains';
import Weightloses from './pages/Weightloses';
import Shop from './pages/shop';
import Foods from './pages/Foods';
import Notification from './pages/Notification';
import Workouts from './pages/Workouts';
import Bmi from './pages/Bmi';
import Detailviews from './pages/Detailviews';
import Carts from './pages/Carts';
import Checkouts from './pages/Checkouts';
import OrderSuccessPage from './pages/OrderSuccessPage';
import  Joinroom from "../src/pages/Joinromm"
import AdminProfileUserSide from './pages/AdminProfileUserSide';
import OrderHistory from './pages/OrderHistory'
import VideoCall from './pages/VideoCall';
import SuscribeHistory from './pages/SuscribeHistory';
import Home2 from './pages/Home2';
import ContactUs from './pages/ContactUs';
import Fitness from './pages/Fitness';
const UserProtected = () => {
    
  return (
   <Routes>
    <Route path ='/contactus' element={<ProtectedRoute><ContactUs/></ProtectedRoute>} />
          <Route path ='/home' element={<ProtectedRoute><Home2/></ProtectedRoute>}/>
          <Route path ='/bmi' element={<ProtectedRoute><Bmi/></ProtectedRoute>}/>
          <Route path ='/userprofile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>

          <Route path ='/editprofile' element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
          <Route path ='/premiumuser' element={<ProtectedRoute><Premium/></ProtectedRoute>}/>
          <Route path ='/shop' element={<ProtectedRoute><Shop/></ProtectedRoute>}/>
          <Route path ='/foods' element ={<ProtectedRoute><Foods/></ProtectedRoute>}/>
          <Route path ='/weightgain' element ={<ProtectedRoute><WeightGains/></ProtectedRoute>}/>
          <Route path ='/weightlose' element ={<ProtectedRoute><Weightloses/></ProtectedRoute>}/>
          <Route path='/notification' element ={<ProtectedRoute><Notification/></ProtectedRoute>}/>
           <Route path='/workouts' element ={<ProtectedRoute><Workouts/></ProtectedRoute>}/>
           <Route path='/detailview' element ={<ProtectedRoute><Detailviews/></ProtectedRoute>}/>
           <Route path='/cart'element ={<ProtectedRoute><Carts/></ProtectedRoute>}/>
           <Route path='/checkout'element ={<ProtectedRoute><Checkouts/></ProtectedRoute>}/>
           <Route path='/sucess' element ={<ProtectedRoute><OrderSuccessPage/></ProtectedRoute>}/>
           <Route path='/appoinment' element ={<ProtectedRoute><AdminProfileUserSide/></ProtectedRoute>}/>
           <Route path='/orderhistory' element ={<ProtectedRoute><OrderHistory/></ProtectedRoute>}/>
           <Route path='/subscriptionhistory' element ={<ProtectedRoute><SuscribeHistory/></ProtectedRoute>}/>
           <Route path='/videocall/:roomId' element={<ProtectedRoute><VideoCall/></ProtectedRoute>} />
           <Route path='/joinroom' element={<ProtectedRoute><Joinroom/></ProtectedRoute>} />
          <Route path='/fitness' element={<ProtectedRoute><Fitness/></ProtectedRoute>}/>
   </Routes>
  )
}

export default UserProtected
