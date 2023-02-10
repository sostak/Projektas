import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const SelectThumbnail = ({ imageFiles, handleThumbnailSelection }) => {

  return (
    imageFiles.length > 0 && (
      <div>
        <p>Pasirinkite pagrindinę nuotrauką:</p>
        <div className="d-flex">
          {imageFiles.map((file, index) => (
            <Card
              key={index}
              style={{ width: '100px', marginRight: '10px', border: index === 0 ? '2px solid blue' : 'none' }}
            >
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${file}`}
                alt={`Image ${index + 1}`}
                style={{ height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => {
                  handleThumbnailSelection(index);
                }}
              />
            </Card>
          ))}
        </div>
      </div>
    )
  );
};

SelectThumbnail.propTypes = {
  imageFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleThumbnailSelection: PropTypes.func.isRequired,
};

export default SelectThumbnail;


