import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = (e: any) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <section className='auth hrms-dash w-100 vh-100'>
      <main className='form-signin  h-100  w-100 d-flex justify-content-center align-items-center m-auto'>
        <form
          className='bg-white mx-3 w-50 p-4 p-md-5 border '
          onSubmit={handleSignUp}
        >
          <h1 className='h2 mb-3  text-center primary-text fw-semibold'>
            Register
          </h1>

          <div className='form-floating'>
            <input
              name='phone'
              type='number'
              className='form-control rounded-0 my-4'
              id='floatingInput'
              placeholder='phone number'
            />
            <label htmlFor='floatingInput'>Phone number</label>
          </div>

          <div className='form-floating rounded-3'>
            <input
              name='password'
              type='password'
              className='form-control rounded-0'
              id='floatingPassword'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <br />
          <div className='form-floating rounded-3'>
            <input
              name='confirm_password'
              type='password'
              className='form-control rounded-0'
              id='floatingPassword'
              placeholder='Password'
            />
            <label htmlFor='floatingPassword'>Confirm Password</label>
          </div>
          <br />

          <button
            className='btn rounde-0 mt-3 btn-primary w-100 py-3   text-white rounded-3'
            type='submit'
          >
            Sign in
          </button>
          <div className='text-center mt-3 text-center'>
            <Link to={'/login'}>Have you an account</Link>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Register;
