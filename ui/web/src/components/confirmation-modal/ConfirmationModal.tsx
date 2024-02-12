import React, { ReactElement, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeleteDoctors } from "../../services";
import { Doctordata } from "../../views/doctors/Doctors";
import { useNavigate } from "react-router-dom";

interface ConfirmationModalProps {
  id: number;
  setDoctorsData?: any;
  doctorsData?: Doctordata[];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  id,
  setDoctorsData,
  doctorsData,
}): ReactElement => {
  const [show, setShow] = useState(false);
  const navigation = useNavigate();

  const handleToggleModal = () => setShow((prev) => !prev);
  const handleDeleteDoctor = () => {
    const newDoctos = doctorsData.filter((item) => item.id !== id);
    DeleteDoctors(id).then((res) => {
      if (setDoctorsData) {
        setDoctorsData(newDoctos);
      }
      console.log(res);
      navigation("/doctors");
    });
    handleToggleModal();
  };

  return (
    <>
      <button onClick={handleToggleModal} className="btn btn-danger">
        Delete
      </button>
      <div className="modal-container">
        <Modal
          show={show}
          centered
          onHide={handleToggleModal}
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Doctor</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            <h5 className="pb-3">Are you sure?</h5>
            <div>
              <Button
                variant="danger"
                className="px-3 me-2"
                onClick={handleDeleteDoctor}
              >
                Yes , Delete
              </Button>
              <Button variant="secondary" onClick={handleToggleModal}>
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ConfirmationModal;
