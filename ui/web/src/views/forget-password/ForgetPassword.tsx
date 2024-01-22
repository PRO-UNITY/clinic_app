import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = (e: any) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <section className='auth hrms-dash w-100 vh-100'>
      <main className='form-signin h-100 w-100 d-flex justify-content-center align-items-center m-auto'>
        <form
          className='bg-white mx-3 p-4 p-md-5 border'
          onSubmit={handleForgotPassword}
        >
          <h1 className='h2 mb-3 text-center primary-text fw-semibold'>
            Forgot Password
          </h1>

          <div className='form-floating'>
            <input
              required
              name='phone'
              type='number'
              className='form-control my-4 rounded-3'
              id='floatingInput'
              placeholder='Enter your phone number'
            />
            <label htmlFor='floatingInput'>Phone number</label>
          </div>

          <button
            className='btn btn-primary w-100 py-3 my-2 text-white border-0'
            type='submit'
          >
            Submit
          </button>

          <div className='text-center mt-3'>
            Remember your password?{' '}
            <Link to={'/login'} className='fw-medium text-decoration-none'>
              Sign in
            </Link>
          </div>
        </form>
      </main>
    </section>
  );
};

export default ForgotPassword;
