import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import AdminProtected from './protect/adminProtected';
import Adminpublic from './protect/adminpublic';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import UserProtected from './UserProtected';
import UserPublic from './UserPublic';
import PublicRoutes from './protect/publicRoutes';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
function App() {
  const { loading } = useSelector((state)=>state.alerts)
  return (
    <div className="App ">
     <BrowserRouter>

     {loading && (
      <div className='flex justify-center align-middle h-full w-full bg-black opacity-70 fixed top-0 left-0 z-9999 '>
    <div class="loader">
   <div data-glitch="Loading..." class="glitch">Loading...</div>
</div>
     </div>
     )}
     
     <Toaster
  position="top-center"
  reverseOrder={false}
  toastStyles={{
    backgroundColor: '#800080',
    padding: '16px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  }}
/>

     <Routes>
     
          <Route exact path ='/'element={<PublicRoutes><Home/></PublicRoutes>}/>
          <Route path="/user*" element={<UserProtected />}/>
          <Route path='/public*' element={<UserPublic/>}/>
          <Route path ='/admin' element={<Adminpublic><AdminLogin/></Adminpublic>}/>
          <Route path ='/dashboard*' element={<AdminProtected><Dashboard/></AdminProtected>}/>
          
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
