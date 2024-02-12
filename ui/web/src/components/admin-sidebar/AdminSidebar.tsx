import "./AdminSidebar.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const sideNavs = [
  {
    id: 1,
    path: "/doctors",
    name: "Doctors",
  },
  {
    id: 2,
    path: "/about",
    name: "About",
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [activeHrmsDash, setActiveHrmsDash] = useState<string | number>("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.assign("/login");
  };

  useEffect(() => {
    setActiveHrmsDash(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="sidebar d-flex  border-secondary border-end  flex-column flex-shrink-0 p-2 ">
        <Link
          onClick={() => setActiveHrmsDash(1)}
          to="/"
          className="px-3 sidebar-logo  w-100 pt-4  mb-md-0  link-body-emphasis text-decoration-none"
        >
          <span className="fs-4 fw-semibold text-uppercase">Admetrics</span>
        </Link>
        <Link to={"/doctors/add"} className="ps-3 mt-5">
          <button className="btn btn-primary ">Add Doctor</button>
        </Link>
        <ul className="nav nav-pills mx-md-2 px-md-3 mt-3  flex-column justify-content-between mb-auto ">
          {sideNavs.map((item) => (
            <li className="pt-1" key={item.id}>
              <Link
                to={item.path}
                onClick={() => setActiveHrmsDash(item.path)}
                className={`text-md-start py-3  text-dark `}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <button
          onClick={handleLogout}
          className={`nav-link text-center text-md-start mx-1 py-3   text-dark`}
        >
          <i
            className={`fa-solid fa-arrow-right-from-bracket fs-5  text-secondary  me-md-3`}
          ></i>
          <span className="btn btn-dark">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
