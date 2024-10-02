/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });
    
    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('lucas.teste@teste.com')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, lucas.teste (não é lucas.teste? Sair)') 

     })

     it('Deve exibir uma mensagem de erro ao inserir usuario invalido', () => {
        cy.get('#username').type('lucas@teste.com')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido.')
     });

     it('Deve exibir uma mensagem de erro ao inserir senha invalido', () => {
        cy.get('#username').type('lucas.teste@teste.com')
        cy.get('#password').type('teste')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should("exist")
     });

     it('Deve fazer login com sucesso usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, lucas.teste (não é lucas.teste? Sair)')
     });

     it('Dever fazer login com sucesso usando fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha , { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, lucas.teste (não é lucas.teste? Sair)')
        
        })

     });

     it.only('Deve fazer o login com sucesso usando comandos customizados', () => {
      cy.login('lucas.teste@teste.com', 'teste@123')
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, lucas.teste (não é lucas.teste? Sair)')
     });

})