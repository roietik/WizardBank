const CUSTOMER = {
    fName: 'John',
    lName:  'Wick',
    postCd: '90210'
}

const CURRENCY = 'Dollar';

const DEPOSIT_AMOUNTS = ['1000', '999', '9'];

const WITHDRAWAL_AMOUNTS = ['100', '99', '9'];

/**
 *
 * @param {object} [customer]
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

/**
 *
 * @param {object} [customer]
 */
const loginCustomer = (customer = CUSTOMER) => {
    cy.get('[ng-click="customer()"]').click();
    cy.get('[name="userSelect"]').select(`${customer.fName} ${customer.lName}`);
    cy.get('[type="submit"]').click();
}

/**
 *
 * * @param {string} value - The amount to deposit as a string.
 */
const addDeposit = (value) => {
    cy.get('[placeholder="amount"]').type(value);
    cy.contains('[type="submit"]', 'Deposit').click();
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

    // Create Transations as Customer
    it('F) Should login as Customer', () => {
        loginCustomer();
        cy.url().should('include', 'account');
    });

    DEPOSIT_AMOUNTS.forEach((amount) => {
        it(`G) Should successfully add a deposit of ${amount}`, () => {
            cy.get('[ng-click="deposit()"]').click();
            addDeposit(amount);

            cy.get('[ng-show="message"]').should('contain', 'Deposit Successful');
        });
    })

    WITHDRAWAL_AMOUNTS.forEach((amount) => {
        it(`Should successfully withdraw ${amount}`, () => {
            cy.get('[ng-click="withdrawl()"]').click();
            cy.contains('[type="submit"]', 'Withdraw').should('be.visible');

            cy.get('[placeholder="amount"]').type(amount);
            cy.contains('[type="submit"]', 'Withdraw').click();

            cy.get('[ng-show="message"]').should('contain', 'Transaction successful');
        });
    })
})
