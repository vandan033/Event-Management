import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    managerName: '',
    address: '',
    profilePicture: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      eventDate: user.eventDate,
      managerName: user.managerName,
      address: user.address,
      profilePicture: null,
    });
    setEditDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!editFormData.name || !editFormData.email || !editFormData.phone || !editFormData.eventDate || !editFormData.managerName || !editFormData.address) {
        setError('All fields are required');
        return;
      }

      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('email', editFormData.email);
      formData.append('phone', editFormData.phone);
      formData.append('eventDate', new Date(editFormData.eventDate).toISOString());
      formData.append('managerName', editFormData.managerName);
      formData.append('address', editFormData.address);
      if (editFormData.profilePicture) {
        formData.append('profilePicture', editFormData.profilePicture);
      }

      const response = await axios.put(
        `http://localhost:5000/api/users/${currentUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUsers(
        users.map((user) =>
          user._id === currentUser._id ? response.data : user
        )
      );
      setEditDialogOpen(false);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleFileChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1">
          Event List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Add New Event
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Event Date</TableCell>
              <TableCell>Manager Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {user.profilePicture && (
                    <img
                      src={`http://localhost:5000/uploads/${user.profilePicture}`}
                      alt="Profile"
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{new Date(user.eventDate).toLocaleDateString()}</TableCell>
                <TableCell>{user.managerName}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Event</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={editFormData.phone}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Event Date"
              name="eventDate"
              type="date"
              value={editFormData.eventDate}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  eventDate: e.target.value,
                }))
              }
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Manager Name"
              name="managerName"
              value={editFormData.managerName}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  managerName: e.target.value,
                }))
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={editFormData.address}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              margin="normal"
              required
              multiline
              rows={3}
            />
            <Box sx={{ mt: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="edit-profile-picture"
              />
              <label htmlFor="edit-profile-picture">
                <Button variant="contained" component="span">
                  Change Profile Picture
                </Button>
              </label>
              {editFormData.profilePicture && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {editFormData.profilePicture.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default UserList; 