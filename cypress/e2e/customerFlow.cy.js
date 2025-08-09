describe('Customer Banking Flow', () => {
    before(() => {
        cy.visit('/');
    })

    after(() => {
        cy.get('[ng-click="home()"]').click();
    })

    // Create Customer via Bank Manager
    it('A) Should login as Bank Manager', () => {
        cy.get('[ng-click="manager()"]').click();
        cy.url().should('include', 'manager');
    });
})
