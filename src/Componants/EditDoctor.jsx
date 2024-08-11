import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditDoctor = ({ show, handleClose, doctor, handleSave }) => {
  const [formData, setFormData] = useState({
    regdId: '',
    name: '',
    dept: '',
    education: '',
    experience: '',
    bio: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        regdId: doctor.regdId || '',
        name: doctor.name || '',
        dept: doctor.dept || '',
        education: doctor.education || '',
        experience: doctor.experience || '',
        bio: doctor.bio || ''
      });
    } else {
      setFormData({
        regdId: '',
        name: '',
        dept: '',
        education: '',
        experience: '',
        bio: ''
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{doctor ? 'Edit Doctor' : 'Add Doctor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRegdId">
            <Form.Label>Regd ID</Form.Label>
            <Form.Control
              type="text"
              name="regdId"
              value={formData.regdId}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDept">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEducation">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formExperience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditDoctor;
