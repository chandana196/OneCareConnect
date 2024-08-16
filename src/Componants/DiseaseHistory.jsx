import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';

const DiseaseHistory = ({ patientId }) => {
  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDisease, setCurrentDisease] = useState({
    patientId: patientId,
    diseaseName: '',
    doctorName: '',
    doctorComments: '',
    isIpd: false,
    hospitalName: '',
    diseaseDate: '',
    dischargeDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    fetchDiseases();
  }, [patientId]);

  const fetchDiseases = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patient/fetch-diseases/${patientId}`);
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const handleShowModal = (disease = {
    patientId: patientId,
    diseaseName: '',
    doctorName: '',
    doctorComments: '',
    isIpd: false,
    hospitalName: '',
    diseaseDate: '',
    dischargeDate: ''
  }) => {
    setCurrentDisease(disease);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = async () => {
    try {
      if (currentDisease.diseaseId) {
        await axios.put(`http://localhost:8080/patient/edit-disease`, currentDisease);
        setDiseases(diseases.map(d => (d.diseaseId === currentDisease.diseaseId ? currentDisease : d)));
        toast.success('Disease updated successfully');
      } else {
        const response = await axios.post('http://localhost:8080/patient/add-disease', currentDisease);
        setDiseases([...diseases, { ...response.data }]);
        toast.success('Disease added successfully');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving disease:', error);
      toast.error('Error in saving disease');
    }
  };

  const handleChange = (e) => {
    setCurrentDisease({ ...currentDisease, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentDisease({ ...currentDisease, [e.target.name]: e.target.checked });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(Math.ceil(diseases.length / itemsPerPage));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(diseases.length / itemsPerPage)));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = diseases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card>
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        Disease History
        <Button variant="primary" onClick={() => handleShowModal()}>Add Disease</Button>
      </Card.Header>
      <Card.Body>
        <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Disease Name</th>
              <th>Doctor Name</th>
              <th>Doctor Comments</th>
              <th>IPD</th>
              <th>Hospital Name</th>
              <th>Disease Date</th>
              <th>Discharge Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((disease, index) => (
              <tr key={index}>
                <td>{disease.diseaseName}</td>
                <td>{disease.doctorName}</td>
                <td>{disease.doctorComments}</td>
                <td>{disease.isIpd ? 'Yes' : 'No'}</td>
                <td>{disease.hospitalName}</td>
                <td>{new Date(disease.diseaseDate).toLocaleDateString()}</td>
                <td>{disease.dischargeDate ? new Date(disease.dischargeDate).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleShowModal(disease)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>

        <Pagination className='float-end'>
          <Pagination.First onClick={handleFirstPage} disabled={currentPage === 1} />
          <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
          {Array.from({ length: Math.ceil(diseases.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextPage} disabled={currentPage === Math.ceil(diseases.length / itemsPerPage)} />
          <Pagination.Last onClick={handleLastPage} disabled={currentPage === Math.ceil(diseases.length / itemsPerPage)} />
        </Pagination>
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentDisease.diseaseId ? 'Edit Disease' : 'Add Disease'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='diseaseName'>
              <Form.Label>Disease Name</Form.Label>
              <Form.Control
                type="text"
                name="diseaseName"
                value={currentDisease.diseaseName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='doctorName'>
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                name="doctorName"
                value={currentDisease.doctorName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='doctorComments'>
              <Form.Label>Doctor Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="doctorComments"
                value={currentDisease.doctorComments}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='isIpd'>
              <Form.Label>IPD</Form.Label>
              <Form.Check
                type="checkbox"
                name="isIpd"
                label="Is IPD?"
                checked={currentDisease.isIpd}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
            <Form.Group controlId='hospitalName'>
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="hospitalName"
                value={currentDisease.hospitalName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='diseaseDate'>
              <Form.Label>Disease Date</Form.Label>
              <Form.Control
                type="date"
                name="diseaseDate"
                value={currentDisease.diseaseDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='dischargeDate'>
              <Form.Label>Discharge Date</Form.Label>
              <Form.Control
                type="date"
                name="dischargeDate"
                value={currentDisease.dischargeDate}
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

export default DiseaseHistory;
