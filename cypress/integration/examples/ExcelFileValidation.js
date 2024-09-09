/// <reference types="Cypress" />
const neatCSV = require('neat-csv')
describe('JWT Test',function(){
    it('1st test case - Is logged in through local storage',function(){
        let productName="";
        cy.LoginAPI().then(function(){
            cy.visit("https://rahulshettyacademy.com/client",{
                onBeforeLoad:function(window){
                    window.localStorage.setItem('token',Cypress.env('tokenVal'))
                }
            })
        })
        cy.get(".card-body b").eq(1).then(function(ele)
      {
       productName =  ele.text();
      })
    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get("[routerlink*='cart']").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("ind")
    cy.get('.ta-results button').each(($e1, index, $list) => {

      if($e1.text()===" India")
      {
          cy.wrap($e1).click()
      }
  })
    cy.get(".action__submit").click();
    cy.wait(2000)
    cy.get(".order-summary button").contains("Excel").click();
    const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_quineebhatt.xlsx"
    cy.task('excelToJsonConverter',filePath).then(function(result)
    {
      cy.log(result)
      cy.log(result.data[1].A);//66b35c20ae2afd4c0b434e3a
      expect(productName).to.equal(result.data[1].B);
      
    })

//Below cy.readFile converts any file into text file
    cy.readFile(filePath).then(function(text)
    {
      expect(text).to.include(productName);
    })
        

    })
})