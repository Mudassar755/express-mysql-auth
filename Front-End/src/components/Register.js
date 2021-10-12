import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { register } from '../services/AuthService';
import UserService from '../services/UserService';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom"

const Register = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { name, email, password } = formData;
  const [error, setError] = useState({
    message: "",
    type: ""
  })

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      // let user = await register(name, email, password)
      const user = await axios.post(process.env.REACT_APP_API_URL + '/auth/register/', {
        name,
        email,
        password
      })
      // console.log("usdersv;kjnsdvs", user)
      localStorage.setItem("token", user.data.token)
     history.push("/")
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => setError({ message: error.msg, type: "error" }));
      }
      console.log(err)
    }
  };
  if (localStorage.getItem("token")) {
    history.push('/');
    return <></>
}
  return (
    <Grid item xs={12}>

      <Grid
        alignItems="center"
        justify="center"
        container
        spacing={2}
      >
        <Grid justify="center" alignItems="center" item xs={8}>
          <Paper style={{ padding: "20px 0" }}>
            <Grid item xs={7} style={{ margin: "auto" }}>
              {/* {error.message &&
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={error.type}>
                  <AlertTitle>Error</AlertTitle>
                  <strong>{error.message}</strong>
                </Alert>
                </Stack>
              } */}
              <div style={{ textAlign: 'center' }}><h1>Car Pro Login</h1></div>
              {/* <div className="login-logo"><img src={Logo} /></div> */}
              <form onSubmit={handleRegister}>
                <div className="form_field">
                  {/* <FormControl >
          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleChange('name')}
          />
          <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
        </FormControl> */}
                  <TextField
                    label="Name"
                    value={name}
                    onChange={handleChange('name')}
                  />
                </div>
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
                  <Button type="submit" variant="contained" color="primary">Register</Button>
                </div>

              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Register;