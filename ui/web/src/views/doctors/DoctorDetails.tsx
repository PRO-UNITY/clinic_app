import { useEffect, useState } from 'react';
import { getDoctorById } from '../../services/doctors/doctos';
import { useParams } from 'react-router-dom';
import DoctorType from '../../types/doctor/Doctor';
import { Table } from 'react-bootstrap';

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<DoctorType>();

  useEffect(() => {
    getDoctorById(id).then((data) => {
      setDoctor(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>Doctor Details</h1>

      <Table className='mt-4' striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Speciality</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Date of birth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{doctor?.first_name}</td>
            <td>{doctor?.last_name}</td>
            <td>{doctor?.categories}</td>
            <td>{doctor?.gender}</td>
            <td>{doctor?.phone}</td>
            <td>{doctor?.date_of_birth}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DoctorDetails;
