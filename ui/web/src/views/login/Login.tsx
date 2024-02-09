import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { SignInUser } from "../../services";

interface SignInData {
  phone: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [signInData, setSignInData] = useState<SignInData>({
    phone: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    SignInUser(signInData)
      .then(async (res) => {
        navigate("/admin/doctors");
        localStorage.setItem("token", res.access);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  // 9989912345678
  // 1
  return (
    <section className="auth hrms-dash w-100 vh-100">
      <main className="form-signin  h-100  w-100 d-flex justify-content-center align-items-center m-auto">
        <form
          className="bg-white mx-3 p-4 p-md-5 border"
          onSubmit={handleSignIn}
        >
          <h1 className="h2 mb-3  text-center primary-text fw-semibold">
            Sign in
          </h1>

          <div className="form-floating">
            <input
              value={signInData.phone}
              required
              name="phone"
              className="form-control  my-4 rounded-3"
              placeholder="name@.com"
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Phone number</label>
          </div>
          <div className="form-floating rounded-3">
            <input
              required
              value={signInData.password}
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {error && (
            <p className="text-center mt-3 text-danger">
              Incorrect phone or password
            </p>
          )}
          <div className="form-check text-start my-3">
            <div className="d-flex justify-content-between flex-column  flex-md-row align-items-center">
              <div>
                <input
                  className="form-check-input d-none"
                  type="checkbox"
                  defaultValue="remember-me"
                  id="flexCheckDefault"
                />
              </div>
              <Link
                to={"/forget-password"}
                className="primary-text text-center text-decoration-none"
              >
                Forget Password
              </Link>
            </div>
          </div>
          <button
            className="btn btn-primary w-100 my-2  text-white border-0"
            type="submit"
          >
            {loading ? (
              <div
                className="spinner-border pinner-border-sm"
                role="status"
              ></div>
            ) : (
              <p className="py-2 m-0">Sign in</p>
            )}
          </button>
        </form>
      </main>
    </section>
  );
};

export default Login;
