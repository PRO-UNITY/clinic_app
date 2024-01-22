/* eslint-disable react/prop-types */
import AdminNavbar from '../components/admin-navbar/AdminNavbar';
import AdminSidebar from '../components/admin-sidebar/AdminSidebar';

const AdminLayout = ({ children }: any) => {
  return (
    <div className='d-flex hrms-dash vh-100 w-100'>
      <AdminSidebar />
      <div className='w-100'>
        <AdminNavbar />
        <div
          style={{ overflow: 'scroll', height: '85vh' }}
          className='px-md-3 '
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
