import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hidenWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className='d-flex flex-column w-100'>
      <div style={hidenWhenVisible}>
        <Button className='w-10 mb-5 py-2 ' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div className='position-relative' style={showWhenVisible}>
        {props.children}
        <Button
          className=' btn  bg-secondary position-absolute bottom-0 end-0 text-light w-10 me-5  mb-2  py-2'
          onClick={toggleVisibility}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
