import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SelectFormGroup = ({ label, name, options, onChange, disabled, defaultOption = '' }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Select
      type='text'
      name={name}
      onChange={onChange}
      disabled={disabled}
    >
      <option>{defaultOption}</option>
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </Form.Select>
  </Form.Group>
);

SelectFormGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  defaultOption : PropTypes.string,
};

export default SelectFormGroup;