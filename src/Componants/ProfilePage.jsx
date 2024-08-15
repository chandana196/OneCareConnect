import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Departments from './Departments';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { toast } from "react-toastify";
import EditDepartment from './EditDepartment';

const Profile = () => {    
    const [showDeptModal, setShowDeptModal] = useState(false);
    const handleOpenDeptModal = () => {
        setShowDeptModal(true);
    };
    const handleCloseDeptModal = () =>  {
        setShowDeptModal(false);
        window.location.reload();
    }
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        userId: '',
        hospitalName: '',
        emailId: '',
        address: '',
        orgType: '',
        regdNo: '',
        contactNo: ''
    });
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({
        hospitalName: '',
        emailId: '',
        address: '',
        orgType: '',
        regdNo: '',
        contactNo: ''
    });
    const [departments, setDepartments] = useState([]);

    const validate = () => {
        const newErrors = {
            hospitalName: '',
            emailId: '',
            address: '',
            orgType: '',
            regdNo: '',
            contactNo: ''
        };
    
        // Hospital Name validation
        if (!profile.hospitalName) {
            newErrors.hospitalName = 'Hospital Name is mandatory.';
        } else if (profile.hospitalName.length < 1 || profile.hospitalName.length > 50) {
            newErrors.hospitalName = 'Hospital Name must be between 1 and 50 characters.';
        }
    
        // Email ID validation
        if (!profile.emailId) {
            newErrors.emailId = 'Email ID is mandatory.';
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(profile.emailId)) {
                newErrors.emailId = 'Email should be valid.';
            }
        }
    
        // Address validation
        if (!profile.address) {
            newErrors.address = 'Address is mandatory.';
        } else if (profile.address.length > 255) {
            newErrors.address = 'Address cannot be more than 255 characters.';
        }
    
        // Organization Type validation
        if (!profile.orgType) {
            newErrors.orgType = 'Organization type is mandatory.';
        } else if (profile.orgType.length < 3 || profile.orgType.length > 50) {
            newErrors.orgType = 'Select an option from the list.';
        }
    
        // Registration Number validation
        if (!profile.regdNo) {
            newErrors.regdNo = 'Registration number is mandatory.';
        } else if (profile.regdNo.length < 3 || profile.regdNo.length > 50) {
            newErrors.regdNo = 'Registration number must be between 3 and 50 characters.';
        }
    
        // Contact Number validation
        if (!profile.contactNo) {
            newErrors.contactNo = 'Mobile number is mandatory.';
        } else {
            const contactPattern = /^[0-9]{10,15}$/;
            if (!contactPattern.test(profile.contactNo)) {
                newErrors.contactNo = 'Mobile number must be between 10 and 15 digits.';
            }
        }
    
        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Retrieve and decrypt userId from sessionStorage
                const encryptedUserId = sessionStorage.getItem('userId');
                if (encryptedUserId) {
                    const bytes = CryptoJS.AES.decrypt(encryptedUserId, 'your-encryption-key');
                    const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

                    // Call API to fetch profile
                    const response = await axios.get(`http://localhost:8080/hospital/fetch-profile/${decryptedUserId}`);
                    const data = response.data;

                    // Update state with the fetched data
                    setProfile({
                        userId: data.hospitalId,
                        hospitalName: data.hospitalName,
                        emailId: data.hospitalEmail,
                        address: data.hospitalAddress, // Assuming regdNo and hospitalId are the same
                        orgType: data.hospitalType, // Update with actual field from response if available
                        regdNo: data.hospitalRegdNo, // Update with actual field from response if available
                        contactNo: data.hospitalContact // Update with actual field from response if available
                    });

                    // Update departments
                    // const formattedDepartments = data.departments.map(dept => ({
                    //     name: dept.deptName,
                    //     doctors: dept.doctors.map(doc => ({
                    //         regdId: doc.docId,
                    //         name: doc.docName,
                    //         dept: dept.deptName,
                    //         education: doc.docEducation,
                    //         experience: doc.docExperience,
                    //         bio: doc.docBio
                    //     }))
                    // }));
                    setDepartments(data.departments);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => setIsEditing(true);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.id]: e.target.value, });
    };

    const handleSave = async (e) => {
        setIsEditing(false);
        e.preventDefault();
        if (validate()) {
        try {
          const response = await axios.put('http://localhost:8080/hospital/update-profile', profile);
          console.log(response);
          toast.success('profile updated successfully');
        } catch (error) {
          toast.error(error.response.data.responseMessage);
          console.error('Profile update error:', error);
        }
      }
      setValidated(true);
      };

    return (
        <Container>
            <h1 className="my-4">{profile.name || 'Hospital Name'}</h1>
            <Row>
                <Col md={6}>
                    <h3>Hospital Profile Details</h3>
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="hospitalName">
                            <Form.Label>Hospital Id</Form.Label>
                            <Form.Control 
                            type="text" 
                            value={profile.userId}
                            required
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="hospitalName">
                            <Form.Label>Hospital Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Hospital Name" 
                            value={profile.hospitalName}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.hospitalName}
                            required
                            readOnly={!isEditing}/>
                            <Form.Control.Feedback type="invalid">
                            {errors.hospitalName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="emailId">
                            <Form.Label>Hospital Email address</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={profile.emailId}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.emailId}
                            required
                            readOnly={!isEditing}/>
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
                            value={profile.address}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.address}
                            required
                            readOnly={!isEditing}/>
                            <Form.Control.Feedback type="invalid">
                            {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="orgType">
                            <Form.Label>Hospital Type</Form.Label>
                            <Form.Control 
                            as="select" 
                            type="select"  
                            value={profile.orgType}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.orgType}
                            required
                            readOnly={!isEditing}>
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
                            value={profile.regdNo}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.regdNo}
                            required
                            readOnly={!isEditing}/>
                            <Form.Control.Feedback type="invalid">
                            {errors.regdNo}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="contactNo">
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Contact No." 
                            value={profile.contactNo}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.contactNo}
                            required
                            readOnly={!isEditing}/>
                            <Form.Control.Feedback type="invalid">
                            {errors.contactNo}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {isEditing ? (
                            <Button variant="primary" onClick={handleSave}>Save</Button>
                        ) : (
                            <Button variant="secondary" onClick={handleEdit}>Edit</Button>
                        )}
                        <Button variant="primary" onClick={handleOpenDeptModal}>Add Dept</Button>
                        </Form>
                </Col>
                <Col md={6}>
                    <h3>Departments</h3>
                    <Departments departments={departments} />
                </Col>
            </Row>
            <EditDepartment show={showDeptModal} handleClose={handleCloseDeptModal} doctor={null} handleSave={handleCloseDeptModal} />
        </Container>
    );
};

export default Profile;
