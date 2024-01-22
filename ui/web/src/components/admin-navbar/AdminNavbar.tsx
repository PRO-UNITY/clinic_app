import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <>
      <Navbar expand={'lg'} className='px-md-4 navbar container mt-4'>
        <div className='container-fluid'>
          <div className=''></div>
          <Navbar.Toggle aria-controls='navbarCollapse' />
          <Navbar.Collapse id='navbarCollapse'>
            <h1 className='fs-2 m-0 w-100 fw-semibold text-uppercase'>
              Clinic
            </h1>
            <Nav className='ms-5 p-4 p-lg-0 align-items-center '>
              <div className=' d-flex align-items-center gap-4 mx-2'>
                <Link className='text-dark' to={'/products/hrms/notification'}>
                  <i className='fa-solid fa-bell fs-4 mx-2'></i>
                </Link>
                <Link className='text-dark' to={'/products/hrms/calendar'}>
                  <i className='fa-solid fa-calendar-check fs-4 mx-2 me-4'></i>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
