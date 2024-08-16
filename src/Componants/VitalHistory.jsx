import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';

const VitalHistory = ({ patientId }) => {
  const [vitals, setVitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentVital, setCurrentVital] = useState({ patientId: patientId, vitalType: '', vitalValue: '', vitalDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    fetchVitals();
  }, [patientId]);

  const fetchVitals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patient/fetch-vitals/${patientId}`);
      setVitals(response.data);
    } catch (error) {
      console.error('Error fetching vitals:', error);
    }
  };

  const handleShowModal = (vital = { patientId: patientId, vitalType: '', vitalValue: '', vitalDate: '' }) => {
    setCurrentVital(vital);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = async () => {
    try {
      if (currentVital.vitalId) {
        await axios.put(`http://localhost:8080/patient/edit-vital`, currentVital);
        setVitals(vitals.map(v => (v.vitalId === currentVital.vitalId ? currentVital : v)));
        toast.success('Vital updated successfully');
      } else {
        const response = await axios.post('http://localhost:8080/patient/add-vital', currentVital);
        setVitals([...vitals, { ...response.data }]);
        toast.success('Vital added successfully');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving vital:', error);
      toast.error('Error in saving vital');
    }
  };

  const handleChange = (e) => {
    setCurrentVital({ ...currentVital, [e.target.name]: e.target.value });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(Math.ceil(vitals.length / itemsPerPage));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(vitals.length / itemsPerPage)));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = vitals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card>
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        Vital History
        <Button variant="primary" onClick={() => handleShowModal()}>Add Vital</Button>
      </Card.Header>
      <Card.Body>
      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vital Type</th>
              <th>Vital Value</th>
              <th>Vital Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((vital, index) => (
              <tr key={index}>
                <td>{vital.vitalType}</td>
                <td>{vital.vitalValue}</td>
                <td>{new Date(vital.vitalDate).toLocaleString()}</td>
                <td>
                  <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleShowModal(vital)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>

        <Pagination className='float-end'>
          <Pagination.First onClick={handleFirstPage} disabled={currentPage === 1} />
          <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
          {Array.from({ length: Math.ceil(vitals.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextPage} disabled={currentPage === Math.ceil(vitals.length / itemsPerPage)} />
          <Pagination.Last onClick={handleLastPage} disabled={currentPage === Math.ceil(vitals.length / itemsPerPage)} />
        </Pagination>
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentVital.vitalId ? 'Edit Vital' : 'Add Vital'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='vitalType'>
              <Form.Label>Vital Type</Form.Label>
              <Form.Control
                type="text"
                name="vitalType"
                value={currentVital.vitalType}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='vitalValue'>
              <Form.Label>Vital Value</Form.Label>
              <Form.Control
                type="text"
                name="vitalValue"
                value={currentVital.vitalValue}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default VitalHistory;
