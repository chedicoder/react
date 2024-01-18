import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  MenuItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(false);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneNumberError(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setRoleError(false);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasError = false;

    // Check for empty fields
    if (!firstName) {
      setFirstNameError(true);
      hasError = true;
    }
    if (!lastName) {
      setLastNameError(true);
      hasError = true;
    }
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!phoneNumber) {
      setPhoneNumberError(true);
      hasError = true;
    }
    if (!username) {
      setUsernameError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError(true);
      hasError = true;
    }
    if (!role) {
      setRoleError(true);
      hasError = true;
    }

    if (hasError) {
      setRegistrationStatus('Please fill in all the fields.');
      return;
    }

    // Create the registration data object
    const registrationData = {
      username,
      password,
      email,
      phone_Number: phoneNumber,
      first_Name: firstName,
      last_Name: lastName,
      role,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if ( response.status === 200) {
        // Registration successful
        console.log('Registration successful');
        navigate(`/`);
        // Optionally, you can redirect the user to the sign-in page here
      } else if (response.status === 400) {
        // User already exists
        setRegistrationStatus('Username or email already exists.');
      } else {
        // Registration failed
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('An error occurred during registration:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_Name"
                  required
                  fullWidth
                  id="first_Name"
                  label="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={firstNameError}
                  helperText={firstNameError && 'Please enter your first name'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="family-name"
                  name="last_Name"
                  required
                  fullWidth
                  id="last_Name"
                  label="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={lastNameError}
                  helperText={lastNameError && 'Please enter your last name'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  error={usernameError}
                  helperText={usernameError && 'Please enter a username'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError && 'Please enter an email address'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="tel"
                  name="phone_Number"
                  required
                  fullWidth
                  id="phone_Number"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  error={phoneNumberError}
                  helperText={phoneNumberError && 'Please enter your phone number'}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="new-password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordError && 'Please enter a password'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="new-password"
                  name="confirmPassword"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  helperText={confirmPasswordError && 'Please confirm your password'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  autoComplete="role"
                  name="role"
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  value={role}
                  onChange={handleRoleChange}
                  error={roleError}
                  helperText={roleError && 'Please select a role'}
                >
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Consultant">Consultant</MenuItem>
                  <MenuItem value="Client">Client</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {registrationStatus && (
                  <Typography variant="body2" color="error" align="center">
                    {registrationStatus}
                  </Typography>
                )}
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
