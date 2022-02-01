import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        position: 'fixed',
        zIndex: '1031',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span class="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
