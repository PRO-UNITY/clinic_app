import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from '../views/register/Register';
import Login from '../views/login/Login';
import Doctors from '../views/doctors/Doctors';
import AddDoctor from '../views/doctors/AddDoctors';
import EditDoctor from '../views/doctors/EditDoctors';
import ForgetPassword from '../views/forget-password/ForgetPassword';

const NoRole = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/register');
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/admin/doctors' element={<Doctors />}>
        <Route path='add' element={<AddDoctor />} />
        <Route path='edit' element={<EditDoctor />} />
      </Route>
    </Routes>
  );
};

export default NoRole;
