import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { fetchUserData, signInUser } from '../../redux/slices/authSlice';
// import { useState } from 'react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    navigate('/admin/doctors');
  };

  return (
    <section className='auth hrms-dash w-100 vh-100'>
      <main className='form-signin  h-100  w-100 d-flex justify-content-center align-items-center m-auto'>
        <form
          className='bg-white mx-3 p-4 p-md-5 border'
          onSubmit={handleLogin}
        >
          <h1 className='h2 mb-3  text-center primary-text fw-semibold'>
            Sign in
          </h1>

          <div className='form-floating'>
            <input
              required
              name='phone'
              type='number'
              className='form-control  my-4 rounded-3'
              id='floatingInput'
              placeholder='name@.com'
            />
            <label htmlFor='floatingInput'>Phone number</label>
          </div>
          <div className='form-floating rounded-3'>
            <input
              required
              name='password'
              type='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <div className='form-check text-start my-3'>
            <div className='d-flex justify-content-between flex-column  flex-md-row align-items-center'>
              <div>
                <input
                  className='form-check-input d-none'
                  type='checkbox'
                  defaultValue='remember-me'
                  id='flexCheckDefault'
                />
              </div>
              <Link
                to={'/forget-password'}
                className='primary-text text-center text-decoration-none'
              >
                Forget Password
              </Link>
            </div>
          </div>
          <button
            className='btn btn-primary w-100 py-3 my-2  text-white border-0'
            type='submit'
          >
            Sign in
          </button>
          <div className='text-center mt-3 text-center'>
            Don&apos;t have you account?{' '}
            <Link to={'/register'} className='fw-medium text-decoration-none'>
              Sign up
            </Link>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Login;
