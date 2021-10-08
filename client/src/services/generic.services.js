import axios from "axios"


const baseURL = process.env.NODE_ENV === "production"
     ? 'http://188.68.220.108:3001/api'
     : 'http://localhost:3001/api'


const axiosInstanse = axios.create({
     baseURL,
     proxyHeaders: false,
     credentials: false,
     // headers:{
     //      'Authorization':  localStorage.getItem('user-token')
     // }
});



axiosInstanse.interceptors.request.use(
     (config) => {
       const token =  localStorage.getItem('user-token')
       if (token) {
         config.headers.Authorization = token;
       }
       return config;
     },
     (error) => Promise.reject(error),
   );


const API_URL = axiosInstanse.defaults.baseURL
// const API_URL = 'http://localhost:3001/api'

export const request = async ({ url, data, method}) => {
   const response = await axiosInstanse[method](`${API_URL}/${url}`, data)
   return response
               
}
