import React, { useState, useEffect } from 'react';
import { Link, Outlet, useOutlet } from 'react-router-dom';
import AdminLayout from '../../layout/AdminLayout';
import { Table } from 'react-bootstrap';
import { GetDoctors } from '../../services';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import ReactPaginate from 'react-paginate';
import './Doctors.css';

export interface Doctordata {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string | null;
  address: string | null;
  information: string;
  gender: string;
  categories: string;
  hospital: string | null;
  avatar: string;
  role: string;
  email: string;
  reviews: number;
  content: { content: string; user: number }[];
  is_saved: boolean;
  experience: number;
}

interface DoctorsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Doctordata[];
}

const Doctors = () => {
  const outlet = useOutlet();
  const [doctorsData, setDoctorsData] = useState<Doctordata[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage, location.pathname]);

  const fetchDoctors = (page: number) => {
    GetDoctors(page).then((res: DoctorsResponse) => {
      setDoctorsData(res.results);
      setTotalPages(Math.ceil(res.count / 10)); // Assuming 10 items per page
    });
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <AdminLayout>
      {outlet ? (
        <Outlet />
      ) : (
        <div className='pt-3'>
          <h3 className='mt-2 pt-1'>Doctors</h3>
          <Table className='mt-4' striped bordered hover>
            {/* Table Headers */}
            <tbody>
              {doctorsData.map((doctor, index) => (
                <tr key={doctor?.id}>
                  <td>{index + 1}</td>
                  <td>{`${doctor?.first_name} ${doctor?.last_name}`}</td>
                  <td>{doctor?.categories}</td>
                  <td>{doctor?.phone}</td>
                  <td>{doctor?.email}</td>
                  <td align='right' style={{ width: '20%' }}>
                    <div>
                      <Link to={`${doctor.id}`}>
                        <button className='btn btn-secondary mx-1'>View</button>
                      </Link>
                      <ConfirmationModal
                        id={doctor?.id}
                        doctorsData={doctorsData}
                        setDoctorsData={setDoctorsData}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination */}
          <div className='d-flex justify-content-end'>
            <ReactPaginate
              activeClassName={'item active '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              marginPagesDisplayed={2}
              nextClassName={`item next ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
              pageClassName={'item pagination-page'}
              previousClassName={`item previous ${
                currentPage === 1 ? 'disabled' : ''
              }`}
              nextLabel='Next'
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel='Previous'
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Doctors;
