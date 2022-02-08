describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const userOne = {
      name: 'RedSquirrrel',
      username: 'Anette',
      password: 'password',
    };

    const userTwo = {
      name: 'Ryan',
      username: 'Second_user',
      password: '123',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', userOne);
    cy.request('POST', 'http://localhost:3003/api/users/', userTwo);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.get('#username');
    cy.get('#password');
    cy.get('#loginBtn');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Anette');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();

      cy.contains('RedSquirrrel logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Anette');
      cy.get('#password').type('wrong');
      cy.get('#loginBtn').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'RedSquirrrel logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Anette', password: 'password' });

      cy.addBlog({
        title: 'First blog',
        author: 'First test author',
        url: 'www.youtube.com',
      });
      cy.addBlog({
        title: 'Second blog',
        author: 'Second test author',
        url: 'www.youtube.com',
      });
      cy.addBlog({
        title: 'Third blog',
        author: 'Third test author',
        url: 'www.youtube.com',
      });
    });

    it('A blog can be created', function () {
      cy.contains('Create A New Blog').click();
      cy.get('#title').type('A new Blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.google.com');
      cy.get('#submitBtn').click();

      cy.contains('A new Blog by Test author');
    });

    it('users can like a blog', function () {
      cy.contains('Second blog').contains('View').click();
      cy.contains('Second blog').parent().find('#like-button').click();
      cy.contains('Second blog').parent().should('contain', 'Likes: 1');
    });

    it('user who created a blog can delete it', function () {
      cy.contains('Third blog').contains('View').click();

      cy.contains('Remove').click();
      cy.get('html').should('not.contain', 'Third blog');
    });

    describe('Another user', function () {
      beforeEach(function () {
        cy.login({ username: 'Second_user', password: '123' });
      });

      it('other users cannot delete the blog', function () {
        cy.contains('Ryan logged in');
        cy.contains('Second blog').contains('View').click();
        cy.get('#delete-button').should('not.exist');
      });

      describe('blogs are ordered according to likes with the blog with the most likes being first', () => {
        it('sorted blogs', function () {
          cy.get('.blogs').then($blog => {
            cy.wrap($blog[2]).contains('View').click();
            cy.wrap($blog[2]).parent().find('#like-button').click();
            cy.wrap($blog[2]).parent().should('contain', 'Likes: 1');
            cy.wait(500);

            cy.wrap($blog[2]).parent().find('#like-button').click();
            cy.wrap($blog[2]).parent().should('contain', 'Likes: 2');
            cy.wait(500);

            cy.wrap($blog[2]).parent().find('#like-button').click();
            cy.wrap($blog[2]).parent().should('contain', 'Likes: 3');
          });
          cy.get('.blogs').first().should('contain', 'Third blog by Third test author');
        });
      });
    });
  });
});
