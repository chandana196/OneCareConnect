import React, { useState }  from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import EditDoctor from './EditDoctor';
import { FaEdit } from 'react-icons/fa';

const Departments = ({ departments }) => {   

    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDeptId, setSelectedDeptId] = useState(null);
    
    const handleShowDr = (deptId, doctor) => {
      setSelectedDeptId(deptId);
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const handleCloseDr = () => setShowModal(false);

    const handleSaveDr = (doctor) => {
        console.log('Saved doctor details:', doctor);
        setShowModal(false);
        window.location.reload();
    };

  return (
    <div>
    <Accordion>
      {departments.map((dept, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{dept.deptName}</Accordion.Header>
          <Accordion.Body>
            <div className="table-responsive">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Doc Id</th>
                    <th>Name</th>
                    {/* <th>Department</th> */}
                    <th>Education</th>
                    <th>Experience</th>
                    {/* <th>Bio</th> */}
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {dept.doctors.map((doctor, idx) => (
                    <tr key={idx}>
                        <td>{doctor.docId}</td>
                        <td>{doctor.docName}</td>
                        <td>{doctor.docEducation}</td>
                        <td>{doctor.docExperience}</td>
                        {/* <td>{doctor.docBio}</td> */}
                        <td>
                        <FaEdit
                          onClick={() => handleShowDr(dept.deptId, doctor)}
                          style={{ cursor: 'pointer' }}
                        />
                        {/* <Button onClick={() => handleShowDr(doctor)}>Edit</Button> */}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            <Button onClick={() => handleShowDr(dept.deptId, null)}>Add Doctor</Button>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
    
    {/* <Accordion>
        {departments.map((dept, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{dept.name}</Accordion.Header>
                <Accordion.Body>
                    <ul>
                        {dept.doctors.map((doctor, idx) => (
                            <li key={idx}>
                                {doctor.name} 
                                <Button onClick={() => handleShowDr(doctor)}>Edit</Button>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={() => handleShowDr(null)}>Add Doctor</Button>
                </Accordion.Body>
            </Accordion.Item>
        ))}
    </Accordion> */}
    <EditDoctor show={showModal} handleClose={handleCloseDr} doctor={selectedDoctor} deptId={selectedDeptId} handleSave={handleSaveDr} />
    </div>
  );
};

export default Departments;
