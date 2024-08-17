import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ForgotPassword = () =>{
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({
      userId: '',
    });
    const [formData, setFormData] = useState({
      userId: ''
    });
    const apiUrl = process.env.REACT_APP_API_URL;

    const validate = () => {
      const newErrors = { userId: '' };

      if (!formData.userId) {
          newErrors.userId = 'Please enter a user ID.';
      } else if (formData.userId.length !== 10) {
          newErrors.userId = 'User ID must be exactly 10 characters long.';
      }

      setErrors(newErrors);
      return Object.values(newErrors).every(error => !error);
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };
  
    const buttonhandler = async (e) => {
      e.preventDefault();
      if (validate()) {
        try {
          const response = await axios.get(`${apiUrl}/hospital/forgot-password/${formData.userId}`);
          console.log(response.data.responseMessage);
          toast.success(response.data.responseMessage);
          toast.success("Password sent to your registered email !!");
          navigate("/Signin");
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.responseMessage);
        }
          // Proceed with form submission logic (e.g., sending data to the server)
          console.log('Form Data:', formData);
      }
      setValidated(true); // Ensure the form shows validation feedback
    };
    return(
        <Card className="m-5" style={{ width: '30vw' }}>
        <Card.Body>
            <Card.Title>Forgot Password</Card.Title>
            <Form noValidate validated={validated} onSubmit={buttonhandler}>
        <Form.Group className="mb-3" controlId="userId">
        <Form.Label>User Id</Form.Label>
        <Form.Control 
          type="userId" 
          placeholder="Enter User Id"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          isInvalid={!!errors.userId}
          required/>
          <Form.Control.Feedback type="invalid">
              {errors.userId}
          </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Card.Body>
    </Card>
        
    );
    
};

export default ForgotPassword;