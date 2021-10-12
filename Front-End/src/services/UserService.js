import axios from 'axios';
const LOCAL_STORAGE_KEY = 'user';
const API_URL = process.env.REACT_APP_API_URL


export const isLoggedIn = (refresh) => {
  if(refresh) {
    console.log('checking with server')
    return false;
  }
  return localStorage.getItem('user') ? true : false;
}

export const getToken = () => {
  console.log(JSON.parse(localStorage.getItem('car_pro_user')))
  return JSON.parse(localStorage.getItem('car_pro_user')).token
}

export const setUser = (user) => {
  console.log(user)
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
    let user = localStorage.getItem('user')
    if(user)
        return JSON.parse(user)
    return false
}

export const deleteUser = () => localStorage.removeItem("token")

export const apiGetUsers = (page = 1, params={}) => axios.get(API_URL + "/users", {
	params: {
		page: page,
		...params
	}
})

export const apiGetUser = (id) => axios.get(API_URL + "/users/" + String(id))


export const apiDeleteUser = (id) =>
    axios.delete(API_URL + "/users/"+ String(id))

const funcs = {
  getToken,
  setUser,
  isLoggedIn,
  deleteUser,
  apiGetUsers,
  apiGetUser,
  apiDeleteUser
}

export default funcs
