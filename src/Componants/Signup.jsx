import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { FormLabel } from "react-bootstrap";

const SignupForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Hospital Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="userEmail">
        <Form.Label>Hospital Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userAddress">
        <Form.Label>Hospital Address</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter Address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="hospitalType">
        <Form.Label>Hospital Type</Form.Label>
        <Form.Select placeholder="Select Type">
          <option value="1">Government</option>
          <option value="2">Private</option>
          <option value="3">SemiPrivate</option>
        </Form.Select>
        </Form.Group>

      <Form.Group className="mb-3" controlId="regdno.">
        <Form.Label>Regd. No.</Form.Label>
        <Form.Control type="regdno." placeholder="Enter Regd. No." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="contact">
        <Form.Label>Contact No.</Form.Label>
        <Form.Control type="contact" placeholder="Enter Contact No." />
      </Form.Group>
       <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const Signup = () => {
  return (
    <div>
      <Card className="m-5" style={{ width: "50vw" }}>
        <Card.Body>
          <Card.Title>Create New Account</Card.Title>
          <SignupForm />
        </Card.Body>
      </Card>
    </div>
  );
};
export default Signup;
