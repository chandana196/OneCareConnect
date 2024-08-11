import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const PatientRegd = () => {
  return (
    <div>
      <Card className="m-5" style={{ width: "50vw" }}>
        <Card.Body>
          <Card.Title>New Patient Registration</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control type="name" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="father/spouseName">
              <Form.Label>Father/Spouse Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Father/Spouse Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dob">
              <Form.Label>DOB</Form.Label>
              <Form.Control type="date" placeholder="Enter DOB" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userAddress">
              <Form.Label>Patient Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select >
                <option value="0">Select Type</option>
                <option value="1">O +ve</option>
                <option value="2">O -ve</option>
                <option value="3">A +ve</option>
                <option value="4">A -ve</option>
                <option value="1">B +ve</option>
                <option value="2">B -ve</option>
                <option value="3">AB +ve</option>
                <option value="4">AB -ve</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="aadharNo.">
              <Form.Label>Aadhar No.</Form.Label>
              <Form.Control type="aadharno." placeholder="Enter Aadhar No." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contact">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control type="contact" placeholder="Enter Contact No." />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PatientRegd;
