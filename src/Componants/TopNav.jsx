import React, { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/TopNav.css';

const TopNav = () => {
    const [show, setShow] = useState(false);

    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    return (
        <Navbar bg="primary" data-bs-theme="light" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Navbar.Brand href="/">One Care Connect</Navbar.Brand>
            <div className='ms-auto'>
            <Form.Control size="sm" type="text" placeholder="Enter Patient Id" aria-describedby="newPatient"/>
            <Form.Text id='newPatient'>
                <a href='/patient-registration'>New Patient Registration</a>
            </Form.Text>
            </div>
            <Nav className="ms-auto">
                <Dropdown show={show} onToggle={handleToggle}>
                    <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components" className="custom-dropdown-toggle">
                        <FaUserCircle size={30} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="/signin">Sign In</Dropdown.Item>
                        <Dropdown.Item href="#signout">Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

export default TopNav;
