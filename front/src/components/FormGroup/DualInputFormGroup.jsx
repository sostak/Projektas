import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DualInputFormGroup = ({ label, placeholder1, name1, placeholder2, name2, onChange }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type='text'
      placeholder={placeholder1}
      name={name1}
      onChange={onChange}
    />
    <Form.Control
      type='text'
      placeholder={placeholder2}
      name={name2}
      onChange={onChange}
    />
  </Form.Group>
);

DualInputFormGroup.propTypes = {
  label: PropTypes.string,
  placeholder1: PropTypes.string,
  name1: PropTypes.string,
  placeholder2: PropTypes.string,
  name2: PropTypes.string,
  onChange: PropTypes.func,
};

export default DualInputFormGroup;