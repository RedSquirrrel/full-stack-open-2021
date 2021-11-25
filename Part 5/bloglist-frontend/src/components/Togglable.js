import React, { useState, useImperativeHandle } from 'react';

// const Togglable = ({ children, buttonLabel, ref }) => {
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
    <div>
      <div style={hidenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
