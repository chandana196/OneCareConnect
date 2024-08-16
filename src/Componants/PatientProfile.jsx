import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Stack from 'react-bootstrap/Stack';
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import VitalHistory from "./VitalHistory";
import DiseaseHistory from "./DiseaseHistory";

const PatientProfile = () => {
  const { patientId } = useParams(); // Assuming you're passing the patient ID via URL
  const [patientData, setPatientData] = useState({
    userId: patientId,
    name: "",
    fsName: "",
    dob: "",
    bgroup: "",
    aadhar: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    fsName: "",
    dob: "",
    bgroup: "",
    aadhar: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    // Fetch patient details by ID
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/patient/fetch-profile/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        toast.error("Failed to fetch patient details.");
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const validate = () => {
    const newErrors = {
      name: "",
      fsName: "",
      dob: "",
      bgroup: "",
      aadhar: "",
      email: "",
      mobile: "",
      address: "",
    };

    // Add validation rules (similar to the signup form)
    if (!patientData.name) {
      newErrors.name = "Patient Name is mandatory.";
    } else if (patientData.name.length < 1 || patientData.name.length > 50) {
      newErrors.name = "Patient Name must be between 1 and 50 characters.";
    }

    if (!patientData.fsName) {
      newErrors.fsName = "Father/Spouse Name is mandatory.";
    } else if (patientData.fsName.length < 1 || patientData.fsName.length > 50) {
      newErrors.fsName = "Father/Spouse Name must be between 1 and 50 characters.";
    }

    if (!patientData.dob) {
      newErrors.dob = "DOB is mandatory.";
    }

    if (!patientData.bgroup) {
        newErrors.bgroup = "Blood group is mandatory.";
    }
      
    if (!patientData.aadhar) {
      newErrors.aadhar = "Patient Aadhar is mandatory.";
    }

    if (patientData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientData.email)) {
      newErrors.email = "Email should be valid.";
    }

    if (!patientData.mobile) {
      newErrors.mobile = "Mobile number is mandatory.";
    } else if (!/^[0-9]{10}$/.test(patientData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits.";
    }

    if (!patientData.address) {
      newErrors.address = "Address is mandatory.";
    } else if (patientData.address.length > 255) {
      newErrors.address = "Address cannot be more than 255 characters.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.id]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.put(`http://localhost:8080/patient/update-profile`, patientData);
        toast.success("Patient details updated successfully.");
        setIsEditing(false);
        setPatientData(response.data); // Optionally refresh the data with the updated response
      } catch (error) {
        toast.error("Failed to update patient details.");
        console.error("Error updating patient data:", error);
      }
    }
    setValidated(true);
  };

  return (
    <Stack gap={3} style={{padding:'1.5rem', overflowX: 'auto'}}>
    <Card>
    <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
      Patient Profile
      {isEditing ? (
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated}>
          <div className="row">
            <div className="col-md-6">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Patient Id</Form.Label>
                <Form.Control
                  type="text"
                  value={patientData.userId}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  value={patientData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  readOnly={!isEditing}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="fsName">
                <Form.Label>Father/Spouse Name</Form.Label>
                <Form.Control
                  type="text"
                  value={patientData.fsName}
                  onChange={handleChange}
                  isInvalid={!!errors.fsName}
                  readOnly={!isEditing}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fsName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={patientData.dob}
                  onChange={handleChange}
                  isInvalid={!!errors.dob}
                  readOnly={!isEditing}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="bgroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  as="select"
                  value={patientData.bgroup}
                  onChange={handleChange}
                  isInvalid={!!errors.bgroup}
                  readOnly={!isEditing}
                  required
                >
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
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="aadhar">
                <Form.Label>Aadhar Number</Form.Label>
                <Form.Control
                  type="text"
                  value={patientData.aadhar}
                  onChange={handleChange}
                  isInvalid={!!errors.aadhar}
                  readOnly={!isEditing}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.aadhar}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={patientData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  readOnly={!isEditing}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="mobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  value={patientData.mobile}
                  onChange={handleChange}
                  isInvalid={!!errors.mobile}
                  readOnly={!isEditing}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={patientData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  readOnly={!isEditing}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          
        </Form>
      </Card.Body>
    </Card>
    <VitalHistory patientId={patientId} />
    <DiseaseHistory patientId={patientId} />
    </Stack>
  );
};

export default PatientProfile;
