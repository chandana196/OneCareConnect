import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: '',
    emailId: '',
    address: '',
    orgType: '',
    regdNo: '',
    password: '',
    contactNo: '',
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    hospitalName: '',
    emailId: '',
    address: '',
    orgType: '',
    regdNo: '',
    password: '',
    contactNo: ''
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const validate = () => {
    const newErrors = {
        hospitalName: '',
        emailId: '',
        address: '',
        orgType: '',
        regdNo: '',
        password: '',
        contactNo: ''
    };

    // Hospital Name validation
    if (!formData.hospitalName) {
        newErrors.hospitalName = 'Hospital Name is mandatory.';
    } else if (formData.hospitalName.length < 1 || formData.hospitalName.length > 50) {
        newErrors.hospitalName = 'Hospital Name must be between 1 and 50 characters.';
    }

    // Email ID validation
    if (!formData.emailId) {
        newErrors.emailId = 'Email ID is mandatory.';
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.emailId)) {
            newErrors.emailId = 'Email should be valid.';
        }
    }

    // Address validation
    if (!formData.address) {
        newErrors.address = 'Address is mandatory.';
    } else if (formData.address.length > 255) {
        newErrors.address = 'Address cannot be more than 255 characters.';
    }

    // Organization Type validation
    if (!formData.orgType) {
        newErrors.orgType = 'Organization type is mandatory.';
    } else if (formData.orgType.length < 3 || formData.orgType.length > 50) {
        newErrors.orgType = 'Select an option from the list.';
    }

    // Registration Number validation
    if (!formData.regdNo) {
        newErrors.regdNo = 'Registration number is mandatory.';
    } else if (formData.regdNo.length < 3 || formData.regdNo.length > 50) {
        newErrors.regdNo = 'Registration number must be between 3 and 50 characters.';
    }

    // Password validation
    if (!formData.password) {
        newErrors.password = 'Password is mandatory.';
    } else if (formData.password.length < 8 || formData.password.length > 15) {
        newErrors.password = 'Password must be between 8 and 15 characters long.';
    }

    // Contact Number validation
    if (!formData.contactNo) {
        newErrors.contactNo = 'Mobile number is mandatory.';
    } else {
        const contactPattern = /^[0-9]{10,15}$/;
        if (!contactPattern.test(formData.contactNo)) {
            newErrors.contactNo = 'Mobile number must be between 10 and 15 digits.';
        }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
};


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
    try {
      const response = await axios.post(`${apiUrl}/hospital/signup`, formData);
      console.log('Signup successful. Your hospital Id is ', response.data.responseMessage);
      toast.success('Signup successful. Your hospital Id is ', response.data.responseMessage);
      navigate("/Signin");
    } catch (error) {
      toast.error(error.response.data.responseMessage);
      console.error('Signup error:', error);
      // Handle error (e.g., show an error message)
    }
  }
  setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="hospitalName">
        <Form.Label>Hospital Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Hospital Name" 
          value={formData.hospitalName}
          onChange={handleChange}
          isInvalid={!!errors.hospitalName}
          required/>
        <Form.Control.Feedback type="invalid">
          {errors.hospitalName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailId">
        <Form.Label>Hospital Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={formData.emailId}
          onChange={handleChange}
          isInvalid={!!errors.emailId}
          required/>
        <Form.Control.Feedback type="invalid">
          {errors.emailId}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Hospital Address</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
          required/>
        <Form.Control.Feedback type="invalid">
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="orgType">
        <Form.Label>Hospital Type</Form.Label>
        <Form.Control 
          as="select" 
          type="select"  
          value={formData.orgType}
          onChange={handleChange}
          isInvalid={!!errors.orgType}
          required>
            <option value="">Select Type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="SemiPrivate">SemiPrivate</option>
          </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.orgType}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="regdNo">
        <Form.Label>Regd. No.</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Regd. No." 
          value={formData.regdNo}
          onChange={handleChange}
          isInvalid={!!errors.regdNo}
          required/>
        <Form.Control.Feedback type="invalid">
          {errors.regdNo}
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
      <Form.Group className="mb-3" controlId="contactNo">
        <Form.Label>Contact No.</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Contact No." 
          value={formData.contactNo}
          onChange={handleChange}
          isInvalid={!!errors.contactNo}
          required/>
        <Form.Control.Feedback type="invalid">
          {errors.contactNo}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const Signup = () => {
  return (
    <div>
      <Card className="m-5" style={{ width: "50vw" }}>
        <Card.Body>
          <Card.Title>Create New Account</Card.Title>
          <SignupForm />
        </Card.Body>
      </Card>
    </div>
  );
};
export default Signup;
