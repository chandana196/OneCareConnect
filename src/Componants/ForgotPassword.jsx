import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () =>{
    const navigate = useNavigate();

    const buttonhandler = () => {
      toast.success("Password sent to your registered email !!");
      navigate("/Signin");
    }
    return(
        <Card className="m-5" style={{ width: '30vw' }}>
        <Card.Body>
            <Card.Title>Forgot Password</Card.Title>
            <Form>
        <Form.Group className="mb-3" controlId="userId">
        <Form.Label>User Id</Form.Label>
        <Form.Control type="userId" placeholder="Enter User Id" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={buttonhandler}>
        Submit
      </Button>
    </Form>
        </Card.Body>
    </Card>
        
    );
    
};

export default ForgotPassword;