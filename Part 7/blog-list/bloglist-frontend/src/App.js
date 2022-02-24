import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';

import { initializeBlogs } from './reducers/blogsReducer';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
import Users from './components/Users';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import { logOut, loadUser } from './reducers/authReducer';
import { initializeUsers } from './reducers/usersReducer';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.loggedUser);
  const blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(loadUser());
  }, [blogs.length]);

  const handleLogOut = () => {
    dispatch(logOut(userInfo));
    window.location.href = '/';
  };

  return (
    <div>
      {userInfo && (
        <Navbar className='p-4' collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='px-5'>
              <Nav.Link href='#' as='span'>
                <Link className=' text-white h5 me-5' to='/'>
                  BLOGS
                </Link>
              </Nav.Link>

              <Nav.Link href='#' as='span'>
                <Link className=' text-white h5' to='/users'>
                  USERS
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className='text-white h5 me-5'>
            <span className='me-5'>{userInfo.name} Logged in</span>
            <button className='btn btn-success ms-2' onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </Navbar>
      )}

      <Notification />

      <div className='container '>
        <Routes>
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/users' element={userInfo === null ? <LoginForm /> : <Users />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={userInfo === null ? <LoginForm /> : <Blogs />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
