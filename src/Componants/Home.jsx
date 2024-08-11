import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="homepage-background">
      <Container>
        <Row className="align-items-center" style={{ height: '100vh' }}>
          <Col md={6}>
            <h1>One Care Connect</h1>
            <h6>
              One Care aims to improve the delivery of technology-enabled care (TEC) across Bristol, North Somerset, and South Gloucestershire. We explore how TEC can help people live more safely and independently at home for longer, reducing hospital admissions. Our project also focuses on younger people, those with learning or physical impairments, mental health conditions, and children with special education needs.
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
