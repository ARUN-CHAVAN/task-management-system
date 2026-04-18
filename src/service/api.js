import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
let isRedirecting=false;
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401 && !isRedirecting) {
      isRedirecting=true;
      //alert("Please login first");
      setTimeout(()=>(isRedirecting=false),2000);
    }
    return Promise.reject(err);
  }
);

export default API;