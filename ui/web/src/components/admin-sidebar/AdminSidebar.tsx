import "./AdminSidebar.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const sideNavs = [
  {
    id: 1,
    path: "/admin/doctors",
    name: "Doctors",
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [activeHrmsDash, setActiveHrmsDash] = useState<string | number>("");

  const handleLogout = () => {
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
          to="/products/hrms/admin"
          className="text-center sidebar-logo  w-100 pt-4  mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4 fw-semibold text-uppercase">Admetrics</span>
        </Link>

        <ul className="nav nav-pills mx-md-2 px-md-3  mt-5 flex-column justify-content-between mb-auto h-100">
          {sideNavs.map((item) => (
            <li className="nav-item pt-1" key={item.id}>
              <Link
                to={item.path}
                onClick={() => setActiveHrmsDash(item.path)}
                className={`nav-link text-center text-md-start mx-1  px-3 py-3   text-dark bg-primary rounded-3 text-white rounded-0`}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}

          <li className="nav-item ">
            <hr />
            <button
              onClick={handleLogout}
              className={`nav-link text-center text-md-start mx-1  px-3 py-3   text-dark`}
            >
              <i
                className={`fa-solid fa-arrow-right-from-bracket fs-5  text-secondary  me-md-3`}
              ></i>
              <span className="btn btn-dark">Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
