import React, { ReactElement, MouseEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ConfirmationModalProps {
  onConfirm: MouseEventHandler;
  onCancel: MouseEventHandler;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}): ReactElement => {
  return (
    <div className='modal-container'>
      <div className='modal-overlay' onClick={onCancel}></div>

      {/* Modal */}
      <Modal
        show={true}
        centered
        onHide={onCancel as unknown as () => void}
        className='custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <b>Are you sure?</b>
          </p>
          <div className='btn-group'>
            <Button variant='success' onClick={onConfirm}>
              Yes
            </Button>
            <Button variant='danger' onClick={onCancel}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
