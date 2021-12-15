describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'RedSquirrrel',
      username: 'Anette',
      password: 'password',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
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
    });

    it('A blog can be created', function () {
      cy.contains('Create A New Blog').click();
      cy.get('#title').type('A new Blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.google.com');
      cy.get('#submitBtn').click();

      cy.contains('A new Blog by Test author');
    });
  });
});
