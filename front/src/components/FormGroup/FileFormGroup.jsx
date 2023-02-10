import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FileFormGroup = ({ label, name, onChange }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type='file'
      name={name}
      multiple
      onChange={onChange}
    />
  </Form.Group>
);

FileFormGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default FileFormGroup;