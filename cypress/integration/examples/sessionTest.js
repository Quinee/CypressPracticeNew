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
    cy.get(".order-summary button").eq(0).click();
    
  cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_quineebhatt.csv")
  .then(async(text)=>
  {
    const csv =  await neatCSV(text)//It converts the CSV to JSON
    console.log(csv)
    const actualProductCSV = csv[0]["Product Name"]
    expect(productName).to.equal(actualProductCSV)
    cy.log(csv[0]["Address"])
        

    })
})})