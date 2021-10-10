import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { register } from '../services/AuthService';
import UserService from '../services/UserService';

const Register = () => {
const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
})
const { name, email, password } = formData;

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
const handleRegister = async (e) => {
    e.preventDefault()

    try {
      let user = await register(name, email, password)
      console.log("usdersv;kjnsdvs", user)
      UserService.setUser(user.data)
    //   this.props.onLogin()
    } catch(err) {
      console.log(err)
      this.setState({error: "Failed to login"})
    }
};
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