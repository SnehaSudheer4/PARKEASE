import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Confirmation = ({ show, onHide, onConfirm, userName, vehicleNumber,vehicleType }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Check-Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {`Do you want to check out `}
        <strong>{`${userName}`}</strong>
        {` with vehicle number `}
        <strong>{`${vehicleNumber}`}</strong>
        {` and vehicle type `}
        <strong>{`${vehicleType}`}</strong>
        {`?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
