import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PatientSignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    fsName: '',
    dob: '',
    bGroup: '',
    aadhar: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    fsName: '',
    dob: '',
    bGroup: '',
    aadhar: '',
    email: '',
    mobile: '',
    address: '',
  });

  const validate = () => {
    const newErrors = {
      name: '',
      fsName: '',
      dob: '',
      bGroup: '',
      aadhar: '',
      email: '',
      mobile: '',
      address: '',
    };

    // Patient Name validation
    if (!formData.name) {
      newErrors.name = 'Patient Name is mandatory.';
    } else if (formData.name.length < 1 || formData.name.length > 50) {
      newErrors.name = 'Patient Name must be between 1 and 50 characters.';
    }

    // Father/Spouse Name validation
    if (!formData.fsName) {
      newErrors.fsName = 'Father/Spouse Name is mandatory.';
    } else if (formData.fsName.length < 1 || formData.fsName.length > 50) {
      newErrors.fsName = 'Father/Spouse Name must be between 1 and 50 characters.';
    }

    // DOB validation
    if (!formData.dob) {
      newErrors.dob = 'DOB is mandatory.';
    }

    // Aadhar validation
    if (!formData.aadhar) {
      newErrors.aadhar = 'Patient Aadhar is mandatory.';
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email should be valid.';
    }

    // Mobile number validation
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is mandatory.';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits.';
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Address is mandatory.';
    } else if (formData.address.length > 255) {
      newErrors.address = 'Address cannot be more than 255 characters.';
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
        const response = await axios.post('http://localhost:8080/patient/signup', formData);
        console.log('Signup successful. ' + response.data.responseMessage);
        toast.success('Signup successful. ' + response.data.responseMessage);
        navigate('/');
      } catch (error) {
        toast.error(error.response.data.responseMessage);
        console.error('Signup error:', error);
      }
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Patient Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Patient Name" 
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          required />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="fsName">
        <Form.Label>Father/Spouse Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Father/Spouse Name" 
          value={formData.fsName}
          onChange={handleChange}
          isInvalid={!!errors.fsName}
          required />
        <Form.Control.Feedback type="invalid">
          {errors.fsName}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="dob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control 
          type="date" 
          value={formData.dob}
          onChange={handleChange}
          isInvalid={!!errors.dob}
          required />
        <Form.Control.Feedback type="invalid">
          {errors.dob}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="bGroup">
        <Form.Label>Blood Group</Form.Label>
        <Form.Control 
          as="select" 
          type="select"  
          value={formData.bGroup}
          onChange={handleChange}>
            <option value="">Default</option>
            <option value="O +ve">O +ve</option>
            <option value="O -ve">O -ve</option>
            <option value="A +ve">A +ve</option>
            <option value="A -ve">A -ve</option>
            <option value="B +ve">B +ve</option>
            <option value="B -ve">B -ve</option>
            <option value="AB +ve">AB +ve</option>
            <option value="AB -ve">AB -ve</option>
          </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="aadhar">
        <Form.Label>Aadhar Number</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Aadhar Number" 
          value={formData.aadhar}
          onChange={handleChange}
          isInvalid={!!errors.aadhar}
          required />
        <Form.Control.Feedback type="invalid">
          {errors.aadhar}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="mobile">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Mobile Number" 
          value={formData.mobile}
          onChange={handleChange}
          isInvalid={!!errors.mobile}
          required />
        <Form.Control.Feedback type="invalid">
          {errors.mobile}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
          required />
        <Form.Control.Feedback type="invalid">
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const PatientSignup = () => {
  return (
    <div>
      <Card className="m-5" style={{ width: "50vw" }}>
        <Card.Body>
          <Card.Title>Create New Patient Account</Card.Title>
          <PatientSignupForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientSignup;
