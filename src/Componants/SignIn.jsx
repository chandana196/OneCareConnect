import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';


const SigninForm = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const encryptionKey = process.env.REACT_APP_Encryption_key;
  ; // Use a strong key
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    userId: '',
    password: ''
  });

  const validate = () => {
    const newErrors = { userId: '', password: '' };

    if (!formData.userId) {
        newErrors.userId = 'Please enter a user ID.';
    } else if (formData.userId.length !== 10) {
        newErrors.userId = 'User ID must be exactly 10 characters long.';
    } else if (!formData.password)
      newErrors.password = 'Please enter a password.';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
    try {
      const response = await axios.post(`${apiUrl}/hospital/signin`, formData);
      console.log('Sign in successful:', response.data.responseMessage);
      const encryptedUserId = CryptoJS.AES.encrypt(formData.userId, encryptionKey).toString();
      sessionStorage.setItem('userId', encryptedUserId);
      toast.success('Login successful');
      navigate("/");
      // window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.responseMessage);
      // Handle error, e.g., show an error message
    }
  }
  setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="userId">
        <Form.Label>User Id</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter User Id"
          value={formData.userId}
          onChange={handleChange} 
          isInvalid={!!errors.userId}
          required/>
        <Form.Control.Feedback type="invalid">
            {errors.userId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          required/>
        <Form.Control.Feedback type="invalid">
            {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-between mb-3">
        <a href="/Signup">Don't have an account? Register</a>
        <a href="/forgotpassword">Forgot password?</a>
      </div>
      <Button variant="primary" type="submit">
        LogIn
      </Button>
    </Form>
  );
};

const Signin = () => {
    return (
      <div>
        <Card className="m-5" style={{ width: '30vw' }}>
        <Card.Body>
            <Card.Title>Login to Your Account</Card.Title>
            <SigninForm/>
        </Card.Body>
    </Card>
    </div>
    );
};
export default Signin;