import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    managerName: '',
    address: '',
    EventPicture: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, EventPicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.eventDate || !formData.managerName || !formData.address) {
      setError('All fields are required');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('eventDate', new Date(formData.eventDate).toISOString());
      formDataToSend.append('managerName', formData.managerName);
      formDataToSend.append('address', formData.address);
      if (formData.EventPicture) {
        formDataToSend.append('profilePicture', formData.EventPicture);
      }

      await axios.post('http://localhost:5000/api/users', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('User registered successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        managerName: '',
        address: '',
        EventPicture: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Event Details
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Event Date"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
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
            value={formData.managerName}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="profile-picture"
            />
            <label htmlFor="profile-picture">
              <Button variant="contained" component="span">
                Upload Event Picture
              </Button>
            </label>
            {formData.EventPicture && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {formData.EventPicture.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/users')}
            >
              Show Details
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UserForm; 