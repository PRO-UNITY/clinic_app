import { useEffect, useState } from "react";
import { Profile } from "../../services";
import AdminLayout from "../../layout/AdminLayout";

const About = () => {
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    Profile().then((res) => setAdmin(res));
  }, []);
  console.log(admin);
  return (
    <AdminLayout>
      <div className="p-4">
        <div
          className="card p-4 mx-auto my-auto  rounded-4"
          style={{ width: "600px" }}
        >
          <div className="img-box mx-auto">
            <img
              className=""
              width={80}
              height={80}
              src={
                "https://icon-library.com/images/profile-icon-png/profile-icon-png-25.jpg"
              }
              alt="img"
            />
          </div>
          <div className="text-center mt-4">
            <p className="fs-3 m-0">
              <b>{admin?.role}</b>
            </p>
            <p className="fs-4 m-0">{admin?.email}</p>
            <p className="fs-5 m-0">{admin?.phone}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default About;
