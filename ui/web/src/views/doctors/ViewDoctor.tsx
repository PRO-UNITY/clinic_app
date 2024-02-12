import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { GetDoctorId } from "../../services";
import { useParams } from "react-router-dom";
import { Doctordata } from "./Doctors";

const ViewDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctordata>();
  useEffect(() => {
    GetDoctorId(id).then((res) => setDoctor(res));
  }, []);
  return (
    <Row className="justify-content-md-center p-4">
      <h2 className="mt-2">View Doctor</h2>
      <Col>
        <Card className="p-3 profile-card">
          <div className="img-box border mx-auto">
            <img className="" src={doctor?.avatar} alt="img" />
          </div>
          <h3 className="text-center">
            {doctor?.first_name} {doctor?.last_name}
          </h3>
          <div className="d-flex mt-4">
            <div className="content-l">
              <h4>Phone:</h4>
            </div>
            <div className="content-r">
              <h5>{doctor?.phone}</h5>
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="content-l">
              <h4>Speciality:</h4>
            </div>
            <div className="content-r">
              <h5>{doctor?.categories}</h5>
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="content-l">
              <h4>Gender:</h4>
            </div>
            <div className="content-r">
              <h5>{doctor?.gender}</h5>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewDoctor;
