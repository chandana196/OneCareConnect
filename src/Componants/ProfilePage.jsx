import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap';
import EditDoctor from './EditDoctor';
import Departments from './Departments';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: 'hospital123',
        registrationNo: 'REG123456',
        id: 'HOSP001',
        email: 'hospital@example.com',
        headOfOrg: 'Dr. John Doe',
        address: '123 Hospital St, City, Country',
        contactNo: '+1234567890'
    });

    const [departments, setDepartments] = useState([
        {
            name: 'Cardiology',
            doctors: [
                {
                    regdId: '123', 
                    name: 'Dr. Smith',
                    dept: 'Cardiology', 
                    education: 'MBBS', 
                    experience: '10 years', 
                    bio: 'Experienced cardiologist'
                },
                {
                    regdId: '124', 
                    name: 'Dr. Johnson',
                    dept: 'Cardiology', 
                    education: 'MBBS MS', 
                    experience: '11 years', 
                    bio: 'Experienced cardiologist'
                }
            ]
        },
        {
            name: 'Neurology',
            doctors: [
                {
                    regdId: '123', 
                    name: 'Dr. Brown',
                    dept: 'Neurology', 
                    education: 'MBBS', 
                    experience: '10 years', 
                    bio: 'Experienced Neurology'
                },
                {
                    regdId: '124', 
                    name: 'Dr. Devis',
                    dept: 'Neurology', 
                    education: 'MBBS MS', 
                    experience: '11 years', 
                    bio: 'Experienced Neurology'
                }
            ]
        }
    ]);


    const handleEdit = () => setIsEditing(true);
    const handleSave = () => setIsEditing(false);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <Container>
            <h1 className="my-4">Hospital Name</h1>
            <Row>
                <Col md={6}>
                    <h3>Hospital Profile Details</h3>
                    <Form>
                        {Object.keys(profile).map((key) => (
                            <Form.Group className="mb-3" key={key}>
                                <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={key}
                                    value={profile[key]}
                                    onChange={handleProfileChange}
                                    readOnly={!isEditing}
                                />
                            </Form.Group>
                        ))}
                        {isEditing ? (
                            <Button variant="primary" onClick={handleSave}>Save</Button>
                        ) : (
                            <Button variant="secondary" onClick={handleEdit}>Edit</Button>
                        )}
                    </Form>
                </Col>
                <Col md={6}>
                    <h3>Departments</h3>
                    <Departments departments={departments} />
                    {/* <Departments departments={departments} handleShowDr={handleShowDr} /> */}
      {/* <EditDoctor show={showModal} handleClose={handleClose} doctor={selectedDoctor} handleSave={handleSave} /> */}
                    {/* <Accordion>
                        {departments.map((dept, index) => (
                            <Accordion.Item eventKey={index.toString()} key={index}>
                                <Accordion.Header>{dept.name}</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {dept.doctors.map((doctor, idx) => (
                                            <li key={idx}>
                                                {doctor.name} 
                                                <Button onClick={() => handleShowDr(doctor)}>Edit</Button>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button onClick={() => handleShowDr(null)}>Add Doctor</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion> */}
                </Col>
            </Row>
            {/* <EditDoctor show={showModal} handleClose={handleCloseDr} doctor={selectedDoctor} handleSave={handleSaveDr} /> */}
        </Container>
    );
};

export default Profile;
