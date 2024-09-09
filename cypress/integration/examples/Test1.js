/// <reference types="Cypress" />
describe('My First test case',function(){
    it("Test case",function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        cy.get('.product:visible').should('have.length',4)

        //Cypress Aliasing
        cy.get('.products').as('productLocator')
        //Parent child chaining
        cy.get('@productLocator').find('.product').should('have.length',4)

        //Add Capsicum to the Cart
        //cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()

        cy.get('.products').find('.product').each(($el,index,$list)=>{
            const vegName = $el.find('h4.product-name').text()
            if(vegName.includes('Cashews')){
                cy.wrap($el).find('button').click();
            }
        })
        //Below we will get error bcs when we use cy.log(logo.text()), here we are not handling promise. We are changing the cypress behvr to non cypress behav ( i,e, adding const logo). In such
        //cases we need to manually handle the promise
        // const logo = cy.get('.brand')
        // cy.log(logo.text())
        cy.get('.brand').then(function(logo){
            cy.log(logo.text())

        })
        console.log('HH')

        //Assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()



        

    })

});
