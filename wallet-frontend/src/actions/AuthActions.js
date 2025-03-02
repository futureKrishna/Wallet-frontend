import { loginSuccess } from "../redux/authSlice";
import axios from "axios";


const baseRoute='http://localhost:4000'

export const fetchlogin = (data) => async (dispatch)=>{
  try{
    const res = await axios.post(`${baseRoute}/login`, data);
    dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
  }
  catch(error){
    console.error('Login error:', error.response?.data || error.message);
    alert("InValid Credentials")
  }
}

export const registerUser=(data)=> async (dispatch)=>{
  try {
    const res = await axios.post(`${baseRoute}/register`, data);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
  }
}