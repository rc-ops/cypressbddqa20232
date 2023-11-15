/// <reference types="cypress" />

context('Login', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login válido', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('have.text', 'Products')
    })

    it('usuario inexistente', () => {
        cy.get('[data-test="username"]').type('standard_angelo')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('senha invalida', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_noway')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('dados em branco', () => {
        cy.get('[data-test="username"]').type('123').clear()
        cy.get('[data-test="password"]').type('123').clear()
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').contains('Epic sadface: Username is required')
    });
})