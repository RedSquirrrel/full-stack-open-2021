import React from 'react';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const addBlog = e => {
    e.preventDefault();

    blogFormRef.current.toggleVisibility();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;

    e.target.title.value = '';
    e.target.author.value = '';
    e.target.url.value = '';

    const content = { title, author, url };
    dispatch(createBlog(content));
  };

  return (
    // <div className='d-flex flex-column w-100 blogForm'>
    <div className='  blogForm'>
      <h2 className='text-center'>Create new </h2>

      <Form onSubmit={addBlog}>
        <Form.Group className='shadow-lg mb-2'>
          <FloatingLabel label='Title...'>
            <Form.Control id='title' type='text' name='title' placeholder='Title' />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className='shadow-lg mb-2'>
          <FloatingLabel label='Author...'>
            <Form.Control id='author' type='text' name='author' placeholder='Author' />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className='shadow-lg mb-2'>
          <FloatingLabel label='URL...'>
            <Form.Control id='url' type='text' name='url' placeholder='url' />
          </FloatingLabel>
        </Form.Group>

        <Button className=' shadow btn ms-5 my-2 py-2' id='submitBtn' type='submit'>
          CREATE
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
