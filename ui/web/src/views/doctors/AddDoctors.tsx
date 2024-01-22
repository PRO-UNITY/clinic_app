import { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    speciality: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDoctor = () => {
    // onAddDoctor(doctorData);
    setDoctorData({
      name: '',
      speciality: '',
    });
    navigate('/admin/doctors');
  };

  return (
    <Row className='justify-content-md-center p-4'>
      <Col md={8}>
        <Card>
          <Card.Header as='h5'>Add Doctor</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter doctor's name"
                  name='name'
                  value={doctorData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId='formSpeciality'>
                <Form.Label>Speciality</Form.Label>
                <Form.Control
                  as='select'
                  name='speciality'
                  value={doctorData.speciality}
                  onChange={handleInputChange}
                >
                  <option value='' disabled>
                    Select speciality
                  </option>
                  <option value='Cardiologist'>Cardiologist</option>
                  <option value='Dermatologist'>Dermatologist</option>
                  <option value='Dermatologist'>Gastroenterologist</option>
                  <option value='Dermatologist'>Gastroenterologist</option>
                  <option value='Orthopedic Surgeon'>
                    Obstetricians and Gynecologists
                  </option>
                  <option value='Orthopedic Surgeon'>Pediatrician</option>
                  <option value='Orthopedic Surgeon'>Neurologist</option>
                  <option value='Orthopedic Surgeon'>Endocrinologist</option>
                  <option value='Orthopedic Surgeon'>Physicians</option>
                  <option value='Orthopedic Surgeon'>Psychiatrist</option>
                  <option value='Orthopedic Surgeon'>Nephrologist</option>
                  <option value='Orthopedic Surgeon'>Ophthalmology</option>
                  <option value='Orthopedic Surgeon'>Anesthesiology</option>
                  <option value='Orthopedic Surgeon'>Oncologist</option>
                  <option value='Orthopedic Surgeon'>Emergency Medicine</option>
                  <option value='Orthopedic Surgeon'>Epidemiologist</option>
                  <option value='Orthopedic Surgeon'>Geriatrician</option>
                  <option value='Orthopedic Surgeon'>Internist</option>
                  <option value='Orthopedic Surgeon'>Hematologist</option>
                  <option value='Orthopedic Surgeon'>Allergist</option>
                  <option value='Orthopedic Surgeon'>Otolaryngologist</option>
                  <option value='Orthopedic Surgeon'>Pathology</option>
                  <option value='Orthopedic Surgeon'>Surgeon</option>
                  <option value='Orthopedic Surgeon'>Urology</option>
                </Form.Control>
              </Form.Group>

              <Button
                className='mt-3'
                variant='primary'
                onClick={handleAddDoctor}
              >
                Add Doctor
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddDoctor;
