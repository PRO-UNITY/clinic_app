import { Link, Outlet, useOutlet } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../components/confirmation-modal/ConfirmationModal";
import { GetDoctors } from "../../services";
import "./Doctors.css";

export interface Doctordata {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string | null;
  address: string | null;
  information: string;
  gender: string;
  categories: string;
  hospital: string | null;
  avatar: string;
  role: string;
  email: string;
  reviews: number;
  content: { content: string; user: number }[];
  is_saved: boolean;
  experience: number;
}

interface DoctorsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Doctordata[];
}

const Doctors = () => {
  const outlet = useOutlet();
  const [doctorsData, setDoctorsData] = useState<Doctordata[]>([]);

  useEffect(() => {
    GetDoctors().then((res: DoctorsResponse) => setDoctorsData(res.results));
  }, []);

  return (
    <AdminLayout>
      {outlet ? (
        <Outlet />
      ) : (
        <div className="mt-3 pt-4">
          <Link to={"/admin/doctors/add"}>
            <button className="btn btn-primary">Add Doctor</button>
          </Link>
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Speciality</th>
                <th>Phone</th>
                <th>Email</th>
                <th align="right" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {doctorsData.map((doctor, index) => (
                <tr key={doctor?.id}>
                  <td>{index + 1}</td>
                  <td>{`${doctor?.first_name} ${doctor?.last_name}`}</td>
                  <td>{doctor?.categories}</td>
                  <td>{doctor?.phone}</td>
                  <td>{doctor?.email}</td>
                  <td align="right" style={{ width: "20%" }}>
                    <div>
                      <Link to={`view/${doctor.id}`}>
                        <button className="btn btn-secondary mx-1">View</button>
                      </Link>
                      <Link to={"/admin/doctors/edit"}>
                        <button className="btn btn-warning mx-1">Edit</button>
                      </Link>
                      <ConfirmationModal
                        id={doctor?.id}
                        doctorsData={doctorsData}
                        setDoctorsData={setDoctorsData}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Doctors;
