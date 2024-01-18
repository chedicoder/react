import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '20px',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F9F9F9',
    },
    '&:hover': {
      backgroundColor: '#EFEFEF',
      cursor: 'pointer',
    },
  },
  addButton: {
    marginBottom: '10px',
  },
  searchContainer: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    marginRight: '10px',
  },
  searchButton: {
    marginRight: '10px',
  },
  resetButton: {
    marginRight: '10px',
  },
  form: {
    marginBottom: '20px',
  },
  formTitle: {
    marginBottom: '10px',
  },
  formLabel: {
    marginBottom: '5px',
  },
  formInput: {
    marginBottom: '10px',
    padding: '5px',
    width: '200px',
  },
  formButton: {
    marginRight: '10px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
});

const ManageUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    phone_Number: '',
    first_Name: '',
    last_Name: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const fetchUsers = async () => {
    try {
      let url = 'http://localhost:8080/api/users';
      if (searchUsername) {
        url += `/${searchUsername}`;
      }
      if (filterRole) {
        url += `/${filterRole ? filterRole : ''}`;
      }
      const response = await axios.get(url);
      if (response) {
        const responseData = Array.isArray(response.data) ? response.data : [response.data];
        setUsers(responseData);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    fetchUsers();
  };

  const handleResetSearch = () => {
    setSearchUsername('');
    setFilterRole('');
    fetchUsers();
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);

      // Check if user and role exist
      if (user && user.role) {
        const roleId = user.role.id;

        // Delete the association between user and role if roleId is not null
        if (roleId) {
          await axios.delete(`http://localhost:8080/api/${userId}/deleteRole/${roleId}`);
        }
      }

      // Delete the user
      await axios.delete(`http://localhost:8080/api/${userId}`);
      fetchUsers(); // Refresh the user list after deletion
      console.log(`Deleted user with ID ${userId}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleCancelAddUser = () => {
    setIsAddingUser(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleToggleApproval = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);
      const updatedUser = { ...user, isapproved: !user.isapproved };

      // Make API call to update the approval status of the user
      await axios.put(`http://localhost:8080/api/users`, updatedUser);

      fetchUsers(); // Refresh the user list after update
    } catch (error) {
      console.error(`Error updating approval status for user with ID ${userId}:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newUser.username.trim() === '' ||
      newUser.password.trim() === '' ||
      newUser.email.trim() === '' ||
      newUser.first_Name.trim() === '' ||
      newUser.last_Name.trim() === '' ||
      newUser.phone_Number.trim() === '' ||
      newUser.role.trim() === ''
    ) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/addUser', newUser);
      setIsAddingUser(false);
      setNewUser({
        username: '',
        password: '',
        email: '',
        phone_Number: '',
        first_Name: '',
        last_Name: '',
        role: '',
      });
      fetchUsers();
      setErrorMessage('');
      console.log('User added successfully!');
    } catch (error) {
      setErrorMessage('Error adding user. Please try again.');
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {isAddingUser ? (
        <div className={classes.form}>
          <h3 className={classes.formTitle}>Add User</h3>
          <form onSubmit={handleSubmit}>
            <label className={classes.formLabel}>
              Username:
              <input type="text" name="username" value={newUser.username} onChange={handleChange} className={classes.formInput} />
            </label>
            <br />
            <label className={classes.formLabel}>
              First Name:
              <input type="text" name="first_Name" value={newUser.first_Name} onChange={handleChange} className={classes.formInput} />
            </label>
            <br />
            <label className={classes.formLabel}>
              Last Name:
              <input type="text" name="last_Name" value={newUser.last_Name} onChange={handleChange} className={classes.formInput} />
            </label>
            <br />
            <label className={classes.formLabel}>
              Password:
              <input type="password" name="password" value={newUser.password} onChange={handleChange} className={classes.formInput} />
            </label>
            <br />
            <label className={classes.formLabel}>
              Email:
              <input type="email" name="email" value={newUser.email} onChange={handleChange} className={classes.formInput} />
            </label>
            <br />
            <label className={classes.formLabel}>
              Phone Number:
              <input type="text" name="phone_Number" value={newUser.phone_Number} onChange={handleChange} className={classes.formInput} />
            </label>
            <br />
            <label className={classes.formLabel}>
              Role:
              <select name="role" value={newUser.role} onChange={handleChange} className={classes.formInput}>
                <option value="">Select Role</option>
                <option value="Client">Client</option>
                <option value="Consultant">Consultant</option>
                <option value="Administrator">Administrator</option>
              </select>
            </label>
            <br />
            <Button variant="contained" type="submit" className={classes.formButton}>Add User</Button>
            <Button variant="contained" onClick={handleCancelAddUser} className={classes.formButton}>
              Cancel
            </Button>
          </form>
          {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAddUser} className={classes.addButton}>
          Add User
        </Button>
      )}
      <div className={classes.searchContainer}>
        <label>
          Search by Username:
          <input type="text" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} className={classes.searchInput} />
        </label>
        <label>
          Filter by Role:
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className={classes.formInput}>
            <option value="">All</option>
            <option value="Client">Client</option>
            <option value="Consultant">Consultant</option>
            <option value="Administrator">Administrator</option>
          </select>
        </label>
        <Button variant="contained" onClick={handleSearch} className={classes.searchButton}>Search</Button>
        <Button variant="contained" onClick={handleResetSearch} className={classes.resetButton}>Reset</Button>
      </div>

      <br />
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Username</TableCell>
              <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Email Address</TableCell>
              <TableCell className={classes.tableHeaderCell}>Phone Number</TableCell>
              <TableCell className={classes.tableHeaderCell}>Created At</TableCell>
              <TableCell className={classes.tableHeaderCell}>Modified At</TableCell>
              <TableCell className={classes.tableHeaderCell}>Is Active</TableCell>
              <TableCell className={classes.tableHeaderCell}>Is Approved</TableCell>
              <TableCell className={classes.tableHeaderCell}>User Role</TableCell>
              <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className={classes.tableRow}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.first_Name}</TableCell>
                <TableCell>{user.last_Name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_Number}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>{user.modified_at}</TableCell>
                <TableCell>{user.isactive ? 'Active' : 'Not Active'}</TableCell>
                <TableCell>
                  {user.isapproved ? 'Approved' : 'Not Approved'}
                  <Button
                    variant="outlined"
                    color={user.isapproved ? 'secondary' : 'primary'}
                    onClick={() => handleToggleApproval(user.id)}
                  >
                    SWITCH
                  </Button>
                </TableCell>
                <TableCell>{user.role.roleName}</TableCell>

                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(user.id)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" href ="/welcome">
                    Back To Welcome Page
      </Button>
    </div>
  );
};

export default ManageUsers;
