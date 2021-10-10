import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
// import { setupAuthInterceptor } from './services/AuthService';
import UserService from './services/UserService';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Header from './components/Header'


const theme1 = createMuiTheme({
  slider: {
    selectionColor: "blue",
    trackSize: 50
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    }
  },
  transitions: {
    create: () => 'none',
  },
})

class App extends Component {

  constructor(props) {
    super(props)
    // setupAuthInterceptor()
  }

  isLoggedIn = () => UserService.isLoggedIn()

  render() {
    return (
        <ThemeProvider theme={theme1}>
            <Router>
              <Header />
                {/* <Route exact path='/' render={() => <Redirect  to={UserService.isAdmin() ? "/admin": "/login"} /> } /> */}
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
             
            </Router>
        </ThemeProvider>
        );
  }
}

export default App;
