import { useEffect, useState } from 'react';
import { Card, Row, Table } from 'react-bootstrap';
import { GetDoctorId } from '../../services';
import { useParams } from 'react-router-dom';
import { Doctordata } from './Doctors';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ViewDoctor = () => {
  const { id } = useParams();
  const [value, onChange] = useState<Value>(new Date());
  const [doctor, setDoctor] = useState<Doctordata>();
  useEffect(() => {
    // @ts-ignore
    GetDoctorId(id).then((res) => setDoctor(res));
  }, []);

  // Example data for patients and their payments
  const patientPayments = [
    { patientName: 'John Doe', payment: 100 },
    { patientName: 'Jane Smith', payment: 150 },
    // Add more patient payment data as needed
  ];

  // Calculate total payments for the doctor
  const totalPayments = patientPayments.reduce(
    (acc, curr) => acc + curr.payment,
    0
  );
  // Calculate doctor's share (assuming 20%)
  const doctorShare = totalPayments * 0.2;

  return (
    <Row className='justify-content-md-center p-4'>
      <h3 className='my2'>View Doctor</h3>
      <>
        <Card className='profile-card mt-5'>
          <div className='row'>
            <div className='col-6 border p-4'>
              <div className='img-box  mx-auto'>
                <img className='' src={doctor?.avatar} alt='img' />
              </div>
              <h3 className='text-center'>
                {doctor?.first_name} {doctor?.last_name}
              </h3>
              <div className='d-flex mt-4'>
                <div className='content-l'>
                  <h4>Phone:</h4>
                </div>
                <div className='content-r'>
                  <h5>{doctor?.phone}</h5>
                </div>
              </div>
              <div className='d-flex mt-4'>
                <div className='content-l'>
                  <h4>Speciality:</h4>
                </div>
                <div className='content-r'>
                  <h5>{doctor?.categories}</h5>
                </div>
              </div>
              <div className='d-flex mt-4'>
                <div className='content-l'>
                  <h4>Gender:</h4>
                </div>
                <div className='content-r'>
                  <h5>{doctor?.gender}</h5>
                </div>
              </div>
              <div className='mt-4'>
                {/* @ts-ignore */}
                <ConfirmationModal id={id} doctorsData={[]} />
              </div>
            </div>
            <div className='col-6 d-flex justify-content-center'>
              <div className='mt-5'>
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
          </div>
        </Card>

        {/* Table for patient payments */}
        <Card className='mt-5'>
          <Card.Body>
            <h4 className='mb-4'>Patient Payments</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Payment ($)</th>
                  <th>Doctor's Share ($)</th>
                </tr>
              </thead>
              <tbody>
                {patientPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.patientName}</td>
                    <td>{payment.payment}</td>
                    <td>{payment.payment * 0.2}</td>{' '}
                    {/* Assuming 20% share for the doctor */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className='text-right'>
              <strong>Total Payments: {totalPayments}</strong>
              <br />
              <strong>Doctor's Share (20%): {doctorShare}</strong>
            </div>
          </Card.Body>
        </Card>
      </>
    </Row>
  );
};

export default ViewDoctor;
