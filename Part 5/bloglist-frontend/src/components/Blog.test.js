import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog/>', () => {
  let component;
  const updateBlog = jest.fn();
  const deleteBlog = jest.fn();
  const user = jest.setMock();

  beforeEach(() => {
    const blog = {
      title: 'A Clever Sticky Footer Technique',
      author: 'Chris Coyier',
      url: 'https://css-tricks.com/a-clever-sticky-footer-technique/',
      likes: 10,
    };
    component = render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />);
  });

  // TEST ==============================================
  test("a blog renders the blog's title and author by default", () => {
    const firstDiv = component.container.querySelector('.first-div');
    const secondDiv = component.container.querySelector('.second-div');
    expect(firstDiv).toBeVisible();
    expect(secondDiv).not.toBeInTheDocument();
  });

  // TEST ==============================================
  test("blog's url and number of likes are shown when the button controlling the shown details has been clicked.", () => {
    const button = component.getByText('View');
    fireEvent.click(button);
    const blogs = component.container.querySelector('.second-div');
    const deleteButton = component.container.querySelector('.deleteBtn');

    expect(blogs).toBeVisible();
    expect(blogs).toHaveTextContent('https://css-tricks.com/a-clever-sticky-footer-technique/');
    expect(blogs).toHaveTextContent('Likes: 10');
    expect(deleteButton).toBeInTheDocument();
  });

  // TEST ==============================================
  test('like button is clicked twice', () => {
    const button = component.getByText('View');
    fireEvent.click(button);

    const likebutton = component.container.querySelector('.likeBtn');
    fireEvent.click(likebutton);
    fireEvent.click(likebutton);

    expect(updateBlog.mock.calls.length).toEqual(2);
  });
});
