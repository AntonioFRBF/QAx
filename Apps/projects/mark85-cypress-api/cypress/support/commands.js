Cypress.Commands.add('postUser', (user) => {
    cy.api({
        url: 'http://localhost:3333/users',
        method: 'POST',
        body: user,
        failOnStatusCode: false
    }).then(response => { return response }) // escapsulamento para reaproveitar codigo
})


Cypress.Commands.add('postSession', (user) => {
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: {
            email: user.email, 
            password: user.password
        },
        failOnStatusCode: false
    }).then(response => { return response }) // escapsulamento para reaproveitar codigo
})  