import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputFormGroup = ({ label, name, placeholder, onChange, type='text', defaultValue='', disabled=false }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  </Form.Group>
);

InputFormGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool
};

export default InputFormGroup;