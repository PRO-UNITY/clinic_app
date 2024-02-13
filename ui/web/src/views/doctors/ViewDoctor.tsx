import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
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
    GetDoctorId(id).then((res) => setDoctor(res));
  }, []);

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
      </>
    </Row>
  );
};

export default ViewDoctor;
