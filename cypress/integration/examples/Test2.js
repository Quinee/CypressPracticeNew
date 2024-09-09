/// <reference types="cypress-iframe" />
 
import 'cypress-iframe'
describe('My Second Test Suite', function() 
{
 
it('My FirstTest case',function() {
 
//Check boxes
cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
cy.get('input[type="checkbox"]').check(['option2','option3'])
 
//Static Dropdown
 
cy.get('select').select('option2').should('have.value','option2')
 
//Dynamic dropdowns
cy.get('#autocomplete').type('ind')
 
cy.get('.ui-menu-item div').each(($e1, index, $list) => {
 
    if($e1.text()==="India")
    {
        cy.wrap($e1).click()
    }
 
 
})
//autocomplete
cy.get('#autocomplete').should('have.value','India')
//visible invisible
cy.get('#displayed-text').should('be.visible')
cy.get('#hide-textbox').click()
cy.get('#displayed-text').should('not.be.visible')
cy.get('#show-textbox').click()
cy.get('#displayed-text').should('be.visible')
 
//radio buttons
 
cy.get('[value="radio2"]').check().should('be.checked')
})
it('Handling of alerts',function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    //Click on Alert
    cy.get('#alertbtn').click()
    cy.on('window:alert',(str)=>{
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
    })

    //Click on Confirm popup
    cy.get('#confirmbtn').click()
    cy.on('window:confirm',(str)=>{
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
    })
})

it('Handling child tabs, page openeing in new tab',function(){

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

//When we open a new tab, ideally the control should go to new tab like we handle in selenium
//But in Cypress, the control cannot go to the new browser so we remove the taget attr
//target attr is responsible for opening in new tab
//We need to do cy.origin as on new tab, the domain gets changed from https://rahulshettyacademy.com to https://www.qaclickacademy.com
//Cypress does not supports Cross origin for security reasons
//So, we need to add cy.origin and perform all the activities wrt new doman under this block
//If we step outside the block then code will refer to https://rahulshettyacademy.com
       cy.get("#opentab").invoke('removeAttr','target').click();
 
       cy.origin("https://www.qaclickacademy.com",()=>
       {
        cy.get("#navbarSupportedContent a[href*='about']").click();
        cy.get(".mt-50 h2").should('contain','QAClick Academy');
       }
 
)})

it('Handling of web tables',function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('tr td:nth-child(2)').each(($el,index,$list)=>{
        const text = ($el).text();
        if(text.includes('Python')){
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price){
                const priceText = price.text();
                expect(priceText).to.equal('25')
            })
        }

    })
})
it('Handling of mosue hover',function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('div.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include','top')
})

it('Handling child windows',function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#opentab").then(function(el){
        const urlRecevived = el.prop('href');
        cy.visit(urlRecevived)
        cy.origin(urlRecevived,()=>{
            cy.get("div.sub-menu-bar a[href*='about']").click()
        })

    })

})
it('iFrame test',()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.frameLoaded('#courses-iframe')
    //cy.iframe().find('li.dropdown').eq(1).invoke('show')
    cy.iframe().contains('Part time jobs').click({force: true})
    cy.wait(2000)
    cy.iframe().find('select[name="select-jpb-type"]').select('Freelancing') 
})
it.only('Verify date selection',()=>{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.wait(1000)
    cy.get(".react-date-picker__inputGroup").click();

    cy.get(".react-calendar__navigation__label").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.contains("button",year).click();
    cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber)-1).click();
    cy.contains("abbr",date).click();

    //Assertion
    cy.get(".react-date-picker__inputGroup__input").each(($el,index)=>
    {
        cy.wrap($el).invoke('val').should('eq',expectedList[index]);
    }
    
    
    
    
    )   

})})