import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ showModal, handleClose, title, body }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Uždaryti
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SuccessModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string
};

export default SuccessModal;
