class ProductPage{

    clickCheckoutBtn(){
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
    }
    clickConfirmCheckoutBtn(){
        return cy.get(':nth-child(4) > :nth-child(5) > .btn')
    }
    //div.suggestions a
    selectCountry(countryName){
        cy.get('div.suggestions a').each(($el,index)=>{
            if($el.text().includes(countryName)){
                cy.wrap($el).click()
            }
        })
        return ;

    }
    addCountryName(){
        return cy.get('#country');
    }
    clickOnPurchase(){
        return cy.get('.ng-untouched > .btn');
    }
    getAlertMsg(){
          cy.get('.alert').then(function(element){
                const receivedText = element.text()
                expect(receivedText.includes('Success')).to.be.true
              //expect(actualText.includes("Success")).to.be.true
          })
          return ;
    }
    clickOnCheckbox(){
        return cy.get("#checkbox2")
    }

}
export default ProductPage;