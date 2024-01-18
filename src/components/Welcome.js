import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: '10px',
  },
  roleSelection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
});

const WelcomePage = () => {
  const classes = useStyles();
  
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remove the userId from localStorage upon logout
    localStorage.removeItem('userId');

    // Redirect to the SignIn page
    navigate('/');
  };

  const handleRoleSelection = async (role) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/${userId}`);
  
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem('username', user.username);
        if (user.role.roleName === role && user.isapproved) {
          navigate(`/${role}`);
        } 
        // Handle case where user does not have the required role
        if ((user.role.roleName !== role &&!user.isapproved)||(user.role.roleName !== role) )
        {
          console.log('User does not have the required role '); 
          navigate('/fail2');
        }
        if (!user.isapproved && user.role.roleName === role)
        {
          console.log('User is not approved'); 
          navigate(`/fail1`);

        }
        
      } else {
        console.log('Error retrieving user data');
        // Handle error retrieving user data
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      // Handle error retrieving user data
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BillCom Consulting
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <Container maxWidth="sm" className={classes.roleSelection}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome! Please select your role:
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleRoleSelection('Administrator')}>
          Administrator
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleRoleSelection('Consultant')}>
          Consultant
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleRoleSelection('Client')}>
          Client
        </Button>
      </Container>
    </div>
  );
};

export default WelcomePage;
