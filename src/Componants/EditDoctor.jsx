import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditDoctor = ({ show, handleClose, doctor, deptId, handleSave }) => {  
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    deptId: deptId,
    docId: '',
    docName: '',
    docEducation: '',
    docExperience: '',
    docBio: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        deptId: doctor.deptId || '',
        docName: doctor.docName || '',
        docId: doctor.docId || '',
        docEducation: doctor.docEducation || '',
        docExperience: doctor.docExperience || '',
        docBio: doctor.docBio || ''
      });
    } else {
      setFormData({
        deptId: deptId,
        docId: '',
        docName: '',
        docEducation: '',
        docExperience: '',
        docBio: ''
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value, });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(doctor) {
      try {
        const response = await axios.put(`${apiUrl}/hospital/edit-doctor`, formData);
        console.log(response);
        toast.success('doctor updated successfully');
      } catch (error) {
        toast.error(error.response.data.responseMessage);
        console.error('Profile update error:', error);
      }
    }
    else {
      try {
        const response = await axios.post(`${apiUrl}/hospital/add-doctor`, formData);
        console.log(response);
        toast.success('doctor added successfully');
      } catch (error) {
        toast.error(error.response.data.responseMessage);
        console.error('Profile update error:', error);
      }
    }
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{doctor ? 'Edit Doctor' : 'Add Doctor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="docName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.docName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="docEducation">
            <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              value={formData.docEducation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="docExperience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="number"
              name="experience"
              value={formData.docExperience}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="docBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              value={formData.docBio}
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
