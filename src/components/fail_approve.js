import React from 'react';
import Button from '@mui/material/Button';

const ApprovePage = () => {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username');

  return (
    <div>
      <h1>Sorry, {username}</h1>
      <p>You can not access to this role.</p>
      <Button variant="contained" color="primary" href='/welcome'>
          Back to welcome page
      </Button>
    </div>
  );
};

export default ApprovePage;
