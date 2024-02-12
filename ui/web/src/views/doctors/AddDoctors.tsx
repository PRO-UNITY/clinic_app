import { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddDoctors, GetCategories } from "../../services";
export interface Category {
  id: number;
  name: string;
}

const AddDoctor = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [doctorData, setDoctorData] = useState({
    categories: "",
    phone: "",
    last_name: "",
    first_name: "",
    groups: 2,
    is_staff: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    GetCategories().then((res) => setCategory(res));
  }, []);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AddDoctors(doctorData).then(() => navigate("/doctors"));
  };

  return (
    <Row className="justify-content-md-center p-4">
      <Col md={8}>
        <Card>
          <Card.Header as="h5">Add Doctor</Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => handleAddDoctor(e)}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  value={doctorData.first_name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={doctorData.last_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formcategories">
                <Form.Label>categories</Form.Label>
                <Form.Control
                  as="select"
                  name="categories"
                  value={doctorData.categories}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select categories
                  </option>
                  {category.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={doctorData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button type="submit" className="mt-3" variant="primary">
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
