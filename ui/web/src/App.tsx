import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { About, AddDoctors, Doctors, Login, ViewDoctor } from "./views";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctors" element={<Doctors />}>
        <Route path="add" element={<AddDoctors />} />
        <Route path=":id" element={<ViewDoctor />} />
      </Route>
    </Routes>
  );
};

export default App;
