import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const buttonhandler = () => {
      navigate("/PatientRegd");
  }
  return (
    <div className="homepage-background">
      <Container>
        <Row className="align-items-center" style={{ height: '100vh' }}>
          <Col md={6} className='d-flex flex-column gap-4'>
            <h1>One Care Connect</h1>
            <h5>
              One Care aims to improve the delivery of technology-enabled care (TEC) across Bristol, North Somerset, and South Gloucestershire. We explore how TEC can help people live more safely and independently at home for longer, reducing hospital admissions. Our project also focuses on younger people, those with learning or physical impairments, mental health conditions, and children with special education needs.
            </h5>
            <Button style={{ width: 'fit-content' }} variant="primary" onClick={buttonhandler}>New Patient Registration</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
