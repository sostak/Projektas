import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({text, data}) => {

  return (<>
    {
      data && 
        <tr>
          <td>{text}</td>
          <td>{data}</td>
        </tr>
    }</>
  );
};

TableRow.propTypes = {
  data: PropTypes.string,
  text: PropTypes.string
};

export default TableRow;