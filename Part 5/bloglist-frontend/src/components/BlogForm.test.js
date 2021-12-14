import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm/>, event handler receives with the right details when a new blog is created', () => {
  const newBlogObject = jest.fn();

  const component = render(<BlogForm newBlogObject={newBlogObject} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'Common mistakes with React Testing Library' },
  });
  fireEvent.change(author, {
    target: { value: 'Kent C. Dodds' },
  });
  fireEvent.change(url, {
    target: { value: 'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library' },
  });
  fireEvent.submit(form);

  expect(newBlogObject.mock.calls).toHaveLength(1);
  expect(newBlogObject.mock.calls[0][0].title).toBe('Common mistakes with React Testing Library');
  expect(newBlogObject.mock.calls[0][0].author).toBe('Kent C. Dodds');
  expect(newBlogObject.mock.calls[0][0].url).toBe(
    'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library'
  );
});
