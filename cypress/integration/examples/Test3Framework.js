/// <reference types="Cypress" />
import HomePage from "../pageObjects/HomePage"
import ProductPage from "../pageObjects/ProductPage"

describe('Test Framework',function(){
    before(function(){
        //we need to resolve the promise to access fixture
        cy.fixture('example').then(function(data){
            this.data = data
        })

    })
    it('Test case 1',function(){
        const homePage = new HomePage()
        const productPage = new ProductPage()

        cy.visit(Cypress.env('url')+'/angularpractice/')
        homePage.getEditBox().type(this.data.name)
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEditBox().should('have.attr','minlength',2)
        homePage.getEntrepreneur().should('be.disabled')
        homePage.getGender().select(this.data.gender)

        //Click on Shop
        homePage.getShopTab().click()
       
        //Select product by calling the method from support/commands.js
        //cy.selectProduct('Blackberry')
        //cy.selectProduct('Nokia Edge')

        //We will call the above method using for each loop
        this.data.productName.forEach(function(elem){
            cy.selectProduct(elem)
        })

        productPage.clickCheckoutBtn().click()
        let sum = 0;
        cy.get('tr td:nth-child(4) strong').each(($el,index)=>{
            //let amount = $el.text().split(" ")
            //sum = Number(sum)+ Number(amount[1].trim())
            
             let amount = $el.text()
      let res = amount.split(" ")
      res = res[1].trim()
      sum = Number(sum) + Number(res)
      cy.log("NN "+sum)
      
      
             
        }).then(function(){
            cy.log("NN2 "+sum)//2

        })
        cy.get('h3 strong').then(function (element) {
            const amount = element.text()
            var res = amount.split(" ")
            var total = res[1].trim()
            expect(Number(total)).to.equal(sum)
      
          })
       
        
        //cy.pause()
        productPage.clickConfirmCheckoutBtn().click()
        productPage.addCountryName().type("Ind")
        cy.wait(4000)
        productPage.selectCountry("India")
        productPage.clickOnCheckbox().click({force:true})
        productPage.clickOnPurchase().click()
        productPage.getAlertMsg()
        

    })

})