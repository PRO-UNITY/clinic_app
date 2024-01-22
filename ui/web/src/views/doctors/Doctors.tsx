import { Link, useOutlet, Outlet } from 'react-router-dom';
import AdminLayout from '../../layout/AdminLayout';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';

const Doctors = () => {
  const outlet = useOutlet();
  const [showModal, setShowModal] = useState(false);

  // delete modal
  const handleConfirm = async () => {
    // if (deleteItemId !== null) {
    //   deleteVacancy(deleteItemId).then(() => setDeleteItemId(0));
    // }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  // delete modal

  return (
    <AdminLayout>
      {outlet ? (
        <Outlet />
      ) : (
        <>
          <Link to={'/admin/doctors/add'}>
            <button className='btn btn-primary'>Add Doctor</button>
          </Link>
          <Table className='mt-4' striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Speciality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amir</td>
                <td>Cardiolog</td>
                <td>
                  <div>
                    <button
                      onClick={() => setShowModal(true)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                    <Link to={'/admin/doctors/edit'}>
                      <button className='btn btn-warning mx-1'>Edit</button>
                    </Link>
                  </div>
                </td>
              </tr>
              {/* {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
            </tr>
          ))} */}
            </tbody>
          </Table>
        </>
      )}

      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </AdminLayout>
  );
};

export default Doctors;
