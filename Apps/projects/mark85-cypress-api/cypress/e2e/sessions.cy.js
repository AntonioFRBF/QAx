describe('POST /sessions', () => {

    it('user session', () => {
        const userData = {
            name: 'ninox',
            email: 'ninox@gmail.com',
            password: 'ninox123'
        }

        cy.postSession(userData)
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.user.name).to.eq(userData.name)
                expect(response.body.user.email).to.eq(userData.email)
            })
    })

    it('invalid password', () => {
        const user = {
            email: 'ninox@gmail.com',
            password: '123'
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })

    it('invalid not found', () => {
        const user = {
            email: 'ninoxfail@gmail.com',
            password: '123'
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })
})