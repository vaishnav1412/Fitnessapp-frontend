
import axios from 'axios';
import "react-dotenv"

const instance = axios.create({
  baseURL:process.env.BASEURL, 
  timeout: 20000, 
  headers: {
    'Content-Type': 'application/json'
  },
});

console.log('hai..test');
instance.interceptors.request.use(
  (config) => {
   
    config.headers.Authorisation = `Bearer ${localStorage.getItem('token')}`;

    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);

export default instance;
