import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "../views/register/Register";
import Login from "../views/login/Login";
import ForgetPassword from "../views/forget-password/ForgetPassword";
import { AddDoctors, Doctors, EditDoctors, ViewDoctor } from "../views";

const NoRole = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/admin/doctors" element={<Doctors />}>
        <Route path="add" element={<AddDoctors />} />
        <Route path="edit" element={<EditDoctors />} />
        <Route path="view/:id" element={<ViewDoctor />} />
      </Route>
    </Routes>
  );
};

export default NoRole;
