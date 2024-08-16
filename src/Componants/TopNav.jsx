import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, InputGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import '../styles/TopNav.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TopNav = () => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [show, setShow] = useState(false);
    const [patientId, setPatientId] = useState('');

    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    useEffect(() => {
        const encryptedUserId = sessionStorage.getItem('userId');
        if (encryptedUserId)
            setIsSignedIn(true);
        else    
            setIsSignedIn(false);
    }, []);

    const onClickProfile = () => {
        navigate("/Profile");
    }

    const handleSignOut = () => {
        sessionStorage.removeItem('userId');
        setIsSignedIn(false);
        toast.success("Signed out successfully")
        navigate("/"); // Redirect to home page
        window.location.reload();
    };

    const handleChange = (e) => {
        setPatientId(e.target.value);
    }

    const handleSearchPatient = () => {
        console.log(patientId);
        navigate(`/PatientProfile/${patientId}`)
    }

    return (
        <Navbar bg="primary" data-bs-theme="light" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Navbar.Brand href="/"><span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>One Care Connect</span></Navbar.Brand>
            
            <div className='ms-auto d-flex flex-row align-items-center gap-3'>
            {isSignedIn && (            
            <Form style={{height: '2rem'}} onSubmit={handleSearchPatient}>
            <InputGroup>
                <Form.Control 
                size="sm" 
                type="text" 
                fontSize="2px"
                placeholder="Enter Patient Id"
                aria-label="Search"
                id='patientId'
                value={patientId}
                onChange={handleChange}
                style={{height: '2rem'}}
                />
                <Button variant="secondary" style={{height: '2rem', paddingTop: '0.15rem'}} onClick={handleSearchPatient}>
                    <FaSearch />
                </Button>
            </InputGroup>
            </Form>
            )}
            <Nav>
                <Dropdown show={show} onToggle={handleToggle}>
                    <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components" className="custom-dropdown-toggle">
                        <FaUserCircle size={30} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                    {isSignedIn ? (
                        <>
                            <Dropdown.Item onClick={onClickProfile}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                        </>
                    ) : (
                        <Dropdown.Item href="/signin">Sign In</Dropdown.Item>
                    )}
                </Dropdown.Menu>
                </Dropdown>
            </Nav>
            </div>
        </Navbar>
    );
};

export default TopNav;
