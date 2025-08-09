const CUSTOMER = {
    fName: 'John',
    lName:  'Wick',
    postCd: '90210'
}

const CURRENCY = 'Dollar';

/**
 *
 * @param {Customer} [customer=CUSTOMER]
 */
const addCustomer = (customer = CUSTOMER) => {
    cy.get('[ng-click="addCust()"]').click();
    cy.get('[ng-model="fName"]').type(customer.fName);
    cy.get('[ng-model="lName"]').type(customer.lName);
    cy.get('[ng-model="postCd"]').type(customer.postCd);
    cy.get('[type="submit"]').click();
}

/**
 *
 * @param {string} currency
 * @param {object} [customer]
 */
const openAccountWith = (currency, customer = CUSTOMER) => {
    cy.get('[name="userSelect"]').select(`${customer.fName} ${customer.lName}`);
    cy.get('[name="currency"]').select(currency);
    cy.get('[type="submit"]').click();
}

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

    it('B) Should add Customer', () => {
        addCustomer();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Customer added successfully');
        });
    })

    it('C) Should go to Open Account', () => {
        cy.get('[ng-click="openAccount()"]').click();
        cy.url().should('include', 'openAccount');
    })

    it('D) Should open Account for Customer', () => {
        openAccountWith(CURRENCY);
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Account created successfully');
        });
    })

    it('E) Should go Home', () => {
        cy.get('[ng-click="home()"]').click();
        cy.url().should('include', 'login');
    })
})
