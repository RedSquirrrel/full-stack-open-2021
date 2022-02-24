import React, { useState } from 'react';
import { Form, FloatingLabel, Button, Collapse, Card } from 'react-bootstrap';

import { login } from '../reducers/authReducer';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    const username = await e.target.username.value;
    const password = await e.target.password.value;
    dispatch(login(username, password));
    e.target.username.value = '';
    e.target.password.value = '';
  };

  return (
    <div>
      <div className=' row d-flex align-content-center  vh-100 form-container w-50 m-auto'>
        <Button
          style={{ width: '30rem' }}
          onClick={() => setOpen(!open)}
          aria-controls='example-collapse-text'
          aria-expanded={open}
          className='shadow w-25'
        >
          click
        </Button>
        <div style={{ minHeight: '150px' }}>
          <Collapse in={open} dimension='width'>
            <div id='example-collapse-text'>
              <Card className='shadow' body style={{ width: '25rem' }}>
                <h4>
                  To login to application use: <br />
                </h4>
                Username: Test User <br />
                Password: secret
              </Card>
            </div>
          </Collapse>
        </div>
        <h2 className='mb-5 text '>Log in to application</h2>

        <Form onSubmit={handleLogin} className='form-container'>
          <Form.Group className='mb-5' controlId='formBasicEmail'>
            <FloatingLabel label='Username' className='mb-3'>
              <Form.Control type='text' name='username' placeholder='Test User' autoComplete='username' />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mb-3'>
            <FloatingLabel label='Password' className='mb-3'>
              <Form.Control type='password' name='password' placeholder='secret' autoComplete='current-password' />
            </FloatingLabel>
          </Form.Group>
          <Button variant='outline-primary' size='lg' className='shadow w-100 py-3' id='loginBtn' type='submit'>
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
