import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      // style={{
      //   position: 'fixed',
      //   zIndex: '1031',
      //   top: '50%',
      //   left: '50%',
      //   transform: 'translate(-50%, -50%)',
      // }}
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
