import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
        // axios.defaults.headers.common['origin'] = process.env.NEXTAUTH_URL
    }else{
       delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;