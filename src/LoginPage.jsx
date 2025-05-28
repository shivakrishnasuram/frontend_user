import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const LoginPage = ({setUserData}) => {
  const token = localStorage.getItem('token'); // or your token key
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState('');
  const handleLogin = async () => {
    setMessage('');
    try {
      const response = await axios.post('https://user-backend-booking.onrender.com/login', {
        gmail: identifier.includes('@') ? identifier : null, // Check if it's an email
        name: !identifier.includes('@') ? identifier : null, // Otherwise, it's a name
        password,
      });
      setUserData(response.data.user)
      console.log(response,"this is i want to show in the ui ")
      const { token } = response.data; // Get the token from the response
      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
        setMessage('Login successful!');
        setMessageType('success');
        navigate('/coaches'); // redirect to Coaches page
        console.log('Token saved:', token);
      } else {
        setMessage('No token received');
        setMessageType('error');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
      setMessageType('error');
    }
  };
  useEffect(() => {
    if (token) {
      navigate('/coaches'); // redirect to Coaches page
    }
  }, []);
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <input
            type="text"
            className="login-input"
            placeholder="Enter Gmail or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="login-input"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

        {message && (
          <p className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
            {message}
          </p>
        )}

        <Link to="/register">
          <p>Don't have an account? Register here</p>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;