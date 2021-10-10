import axios from 'axios';
import UserService from './UserService';

export const login = async (email, password) => {
  // console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL)
  return axios.post(process.env.REACT_APP_API_URL + '/auth/local/', {
    email,
    password
  })
}
export const register = async (name, email, password) => {
  // console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL)
  return axios.post(process.env.REACT_APP_API_URL + '/auth/register/', {
    name,
    email,
    password
  })
}

const funcs = {
  login,
  register,
}
export default funcs
