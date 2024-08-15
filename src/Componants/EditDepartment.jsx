import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const EditDepartment = ({ show, handleClose, department, handleSave }) => {
    const encryptedUserId = sessionStorage.getItem('userId'); 
    var decryptedUserId = '';
    if(encryptedUserId) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, 'your-encryption-key');
        decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
    }  
  const [formData, setFormData] = useState({
    hospitalId: decryptedUserId,
    deptId: '',
    deptName: ''
  });

  useEffect(() => {
    if (department) {
      setFormData({
        hospitalId: department.hospitalId || '',
        deptId: department.deptId || '',
        deptName: department.deptName || ''
      });
    } else {
      setFormData({
        hospitalId: decryptedUserId,
        deptId: '',
        deptName: ''
      });
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (department) {
      try {
        const response = await axios.put('http://localhost:8080/hospital/edit-department', formData);
        console.log(response);
        toast.success('Department updated successfully');
      } catch (error) {
        toast.error(error.response.data.responseMessage);
        console.error('Department update error:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8080/hospital/add-department', formData);
        console.log(response);
        toast.success('Department added successfully');
      } catch (error) {
        toast.error(error.response.data.responseMessage);
        console.error('Department addition error:', error);
      }
    }
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{department ? 'Edit Department' : 'Add Department'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="deptName">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              name="deptName"
              value={formData.deptName}
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

export default EditDepartment;
