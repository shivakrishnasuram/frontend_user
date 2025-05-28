import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Typography,
    Box,
    Paper
} from '@mui/material';
import './Regi.css';
import { Link } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gmail: '',
        password: '',
        sport: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://user-backend-booking.onrender.com/register', formData);
            console.log(formData);
            toast.success('Registration successful!');
            console.log(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Registration failed!');
        }
    };


    return (
        <>
            <Container className="register-container" maxWidth="sm">
                <Link to="/">home</Link>
                <Paper elevation={3} className="register-paper">
                    <Typography variant="h4" className="register-title">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} className="register-form">
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            margin="normal"
                            variant="outlined"
                            className="form-field"
                        />
                        <TextField
                            fullWidth
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            margin="normal"
                            variant="outlined"
                            className="form-field"
                        />
                        <TextField
                            fullWidth
                            label="Gmail"
                            name="gmail"
                            type="email"
                            value={formData.gmail}
                            onChange={handleChange}
                            required
                            margin="normal"
                            variant="outlined"
                            className="form-field"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            margin="normal"
                            variant="outlined"
                            className="form-field"
                        />
                        <FormControl fullWidth margin="normal" className="form-field">
                            <InputLabel id="sport-label">Sport</InputLabel>
                            <Select
                                labelId="sport-label"
                                name="sport"
                                value={formData.sport}
                                onChange={handleChange}
                                required
                                label="Sport"
                            >
                                <MenuItem value="">Select Sport</MenuItem>
                                <MenuItem value="cricket">Cricket</MenuItem>
                                <MenuItem value="volleyball">Volleyball</MenuItem>
                                <MenuItem value="football">Football</MenuItem>
                                <MenuItem value="badminton">Badminton</MenuItem>
                                <MenuItem value="tennis">Tennis</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            className="submit-button"
                            fullWidth
                            size="large"
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
                <Link to="/login">
                    <p>Don't have an account? Register here</p>
                </Link>
            </Container>
            <ToastContainer />
        </
        >
    );
};

export default Register;



