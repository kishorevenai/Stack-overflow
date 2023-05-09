import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if(localStorage.getItem("authuser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("authuser")).token
    }`;
  }
  return req;
});

export const logIn = async (authData) => {
  try {
    const response = await API.post("/user/login", authData);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (authData) => {
  try {
    const response = await API.post("/user/signup", authData);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
export const addQuestion = async (questionData) => {
  try {
    const response = await API.post("/questions/Ask", questionData);
    return response;
  } catch (error) {}
};

















// import axios from 'axios';

// axios.interceptors.request.use((config) => {
//   const token = getCookie('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// function getCookie(name) {
//   const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
//   return cookieValue ? cookieValue.pop() : '';
// }
