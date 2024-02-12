/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import AdminSidebar from "../components/admin-sidebar/AdminSidebar";

const AdminLayout = ({ children }: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="d-flex hrms-dash vh-100 w-100">
      <AdminSidebar />
      <div className="w-100">
        <div className="px-md-3">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
