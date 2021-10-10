import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { login} from '../services/AuthService';
import UserService from '../services/UserService';

import {Redirect} from 'react-router-dom'

const Login = () => {
const [formData, setFormData] = useState({
    email:"",
    password:""
})
const [loggedIn, setLoggedIn] = useState(false)
const { email, password } = formData;

// const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
// }
// const onChange = name => event => {
//     // this.setState({[name]: event.target.value}); 
//     setFormData({ ...formData, [name]: event.target.value })
//   }
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
 const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      let user = await login(email, password)
      console.log("userrr", user)
    //   localStorage.setItem('token', user.data.token)
      UserService.setUser(user.data)
      setLoggedIn(true)
    } catch(err) {
      console.log(err)
    }
  }

  return (
        <Grid item xs={12}>
      <Grid
        alignItems="center"
        justify="center"
        container
        spacing={2}
      >
        <Grid  justify="center"alignItems="center" item xs={8}> 
        <Paper  style={{padding: "20px 0" }}>
            <Grid  item xs={7} style={{margin: "auto"} }>
                <div style={{textAlign: 'center'}}><h1>Car Pro Login</h1></div>
                {/* <div className="login-logo"><img src={Logo} /></div> */}
                <form onSubmit={handleLogin}>
    
            <div className="form_field">
              <TextField
                label="Email"
                value={email}
                onChange={handleChange('email')}
              />
            </div>
            <div className="form_field">
              <TextField
                label="Password"
                value={password}
                onChange={handleChange('password')}
                type="password"
              />
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary">Login</Button>
            </div>

          </form>
            </Grid>
        </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login;