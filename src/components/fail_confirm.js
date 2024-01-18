import React from 'react';
import Button from '@mui/material/Button';

const ConfirmationPage = () => {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username');

  return (
    <div>
      <h1>Sorry, {username}</h1>
      <p>Please wait for the confirmation of your role.</p>
      <Button variant="contained" color="primary" href='/welcome'>
          Back to welcome page
      </Button>
    </div>
  );
};

export default ConfirmationPage;
