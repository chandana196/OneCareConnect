import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const SigninForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="userId">
            <Form.Label>User Id</Form.Label>
            <Form.Control type="userId" placeholder="Enter User Id" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="d-flex justify-content-between mb-3">
            <a href="/Signup">Don't have an account? Register</a>
            <a href="/forgotpassword">Forgot password?</a>
          </div>
          <Button variant="primary" type="submit">
            LogIn
          </Button>
        </Form>
      );
};

const Signin = () => {
    return (
      <div>
        <Card className="m-5" style={{ width: '30vw' }}>
        <Card.Body>
            <Card.Title>Login to Your Account</Card.Title>
            <SigninForm/>
        </Card.Body>
    </Card>
    </div>
    );
};
export default Signin;