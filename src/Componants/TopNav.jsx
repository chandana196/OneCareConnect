import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, InputGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import '../styles/TopNav.css';

const TopNav = () => {
    const [show, setShow] = useState(false);

    const handleToggle = (isOpen) => {
        setShow(isOpen);
    };

    return (
        <Navbar bg="primary" data-bs-theme="light" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Navbar.Brand href="/">One Care Connect</Navbar.Brand>
            
            <div className='ms-auto d-flex flex-row align-items-center gap-3'>
            <Form style={{height: '2rem'}}>
            <InputGroup>
                <Form.Control 
                size="sm" 
                type="text" 
                fontSize="2px"
                placeholder="Enter Patient Id"
                aria-label="Search"
                style={{height: '2rem'}}
                />
                <Button variant="secondary" style={{height: '2rem', paddingTop: '0.15rem'}}>
                    <FaSearch />
                </Button>
            </InputGroup>
            </Form>
            <Nav>
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
            </div>
        </Navbar>
    );
};

export default TopNav;
