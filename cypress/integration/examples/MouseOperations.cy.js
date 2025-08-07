
//https://github.com/qaboxletstest/Cypress-Demo/blob/master/cypress/integration/QABOX/TC_12_MouseEvents.spec.js

require('@4tw/cypress-drag-drop')
import 'cypress-iframe'

describe("Mouse Operations", () => {
 
    it.skip('MouseOver', () => {
      cy.viewport('macbook-16')
      cy.visit("https://demo.opencart.com/");
      
      cy.get("#narbar-menu > ul > li:nth-child(1) > div > div > ul > li:nth-child(2) > a").should('not.be.visible')
      cy.get("#narbar-menu > ul > li:nth-child(1)").trigger('mouseover').click();
      cy.get("#narbar-menu > ul > li:nth-child(1) > div > div > ul > li:nth-child(2) > a").should('be.visible')
   
    });  

    
    it.skip('Right click', () => {
        cy.visit("http://swisnl.github.io/jQuery-contextMenu/demo.html");
       
        //Method1 - using trigger()
        /* cy.get(".context-menu-one.btn.btn-neutral").trigger('contextmenu');
         cy.get(".context-menu-item.context-menu-icon.context-menu-icon-copy>span")
         .should('be.visible');
         */

        //Method2 - using rightclick()
        cy.get(".context-menu-one.btn.btn-neutral").rightclick()
        cy.get(".context-menu-item.context-menu-icon.context-menu-icon-copy>span")
        .should('be.visible');


    }); 

    
    it('Double click', () => {
      cy.visit("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3");
      
      cy.frameLoaded('#iframeResult');   // Load the frame
      
       //Method1 - using trigger()
      /*cy.iframe('#iframeResult')
        .should('be.visible')
        .find("button[ondblclick='myFunction()']").trigger('dblclick');   */

      //Method2 - using dblclick()
      cy.iframe('#iframeResult')
      .should('be.visible')
      .find("button[ondblclick='myFunction()']").dblclick();

      //validation
      cy.iframe('#iframeResult')
        .find("#field2").should('be.visible')
      //.contains("Hello World!") //not worked
      //.should('have.text','Hello World!');//not worked
        .should('have.value','Hello World!');
    }); 
    
    it.only('Drag and Drop using plugin', () => {
            
      cy.visit('https://testing.qaautomationlabs.com/drag-and-drop.php')
      cy.get('#sortableList > li:nth-child(1) > strong').drag('#sortableList > li:nth-child(2) > strong', {force: true});
   });  


   it.skip('Scrolling Page', () => {
            
       cy.visit('https://www.countries-ofthe-world.com/flags-of-the-world.html')
       cy.get(':nth-child(1) > tbody > :nth-child(86) > :nth-child(1) > img').scrollIntoView({ duration: 2000 }).should('be.visible', true);
       cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(1) > img').scrollIntoView({ duration: 2000 }).should('be.visible', true);
       cy.get('#footer').scrollIntoView();
  });  



});