import React,{useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { getUser, deleteUser } from '../services/UserService'
import {Link} from 'react-router-dom'

const Header = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const user = getUser()
    if(user){
      setUser(user)
    }
        },[])
        console.log("user==>>>",user &&  user.name)
  return (
    <Box sx={{ flexGrow: 1 }} style={{marginBottom:"50px"}}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to ="/">Home</Link>
          </Typography>
          {user ? <><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         {user &&  user.name}
          </Typography><Button color="inherit" onClick={deleteUser}>Log Out</Button></> : <>
            <Button color="inherit"><Link to ="/login">Login</Link></Button>
          <Button color="inherit"><Link to ="/register">Register</Link></Button>
          </>}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;