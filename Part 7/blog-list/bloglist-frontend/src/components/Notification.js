import React from 'react';
import { useSelector } from 'react-redux';
import { Toast, ToastContainer } from 'react-bootstrap';

const Notification = () => {
  const message = useSelector(state => state.notification.text);
  const styledType = useSelector(state => state.notification.styledType);
  if (!message) return null;

  return (
    <ToastContainer className={`p-4 w-50 ${styledType}`} position='top-center'>
      <Toast className='w-100'>
        <Toast.Body className='p-4 h4 text-center w-100 '>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
