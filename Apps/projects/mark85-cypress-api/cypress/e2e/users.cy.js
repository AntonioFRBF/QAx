describe('POST /users', () => {
  it('register a new user', () => {

    const user = {
      name: 'ninox',
      email: 'ninox@gmail.com',
      password: 'ninox123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })

  it('duplicate email', () => {

    const user = {
      name: 'ninox teste',
      email: 'ninoxteste@gmail.com',
      password: 'ninox teste'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(409)
        expect(response.body.message).to.eq('Duplicated email!')
      })
  })

  context('requerid fields', () => {
    let user;

    beforeEach(() => {
       user = {
        name: 'Nino',
        email: 'nino@gmail.com',
        password: 'nino123'
      }
    })

    it('name is required', () => {
      delete user.name

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('email is required', () => {
      delete user.email

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('password is required', () => {
      delete user.password

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"password\" is required')
        })
    })
  })
})