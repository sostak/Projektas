import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputFormGroup = ({ label, name, placeholder, onChange, type='text' }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  </Form.Group>
);

InputFormGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default InputFormGroup;