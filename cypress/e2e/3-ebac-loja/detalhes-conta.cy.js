/// <reference types="cypress"/>

describe('Funcionalidade: Detalhes da Conta', () => {
    
    beforeEach(() => {
        cy.visit('minha-conta/edit-account')
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
        })
    });

it('Deve completar detalhes da conta com sucesso', () => {
    cy.detalhesConta('Lucas' , 'Tsunoda' , 'lucas-teste')
    cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
});

});