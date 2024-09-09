/// <reference types="Cypress" />

describe("API Tests",function(){

    it('First API test case',function(){
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        cy.intercept({
            method: "GET",
            url:"https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty"
        }
            ,{
                statusCode:200,
                body:[{
                    "book_name": "Basics of API Testing",
                    "isbn": "rfg",
                    "aisle": "220"
                },
            ]
            }).as('bookretrievals')

            cy.get('.btn-primary').click()
            // cy.wait('@bookretrievals').should(({request,response})=>{
            //     cy.get('tbody tr').should('have.length',response.body.length)
            // })
            cy.wait('@bookretrievals')//It means Wait till the promise of the bookretrievals is resolved
            .then(({request,response})=>
     {
         cy.get('tr').should('have.length',response.body.length+1)
      
     })
            cy.get('p').should('have.text','Oops only 1 Book available')
    }
)
it('Second API test case',function(){
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/")
    
    cy.intercept('GET',"https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
    (req)=>{
        req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=sharma"

        req.continue((res)=>{
            //expect(res.statusCode).to.equal(403)
        })
    }
).as('dummyUrl')
    //cy.wait('@dummyUrl')
    cy.get('.btn-primary').click()
    cy.wait('@dummyUrl')
})
/**
 * cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
    (req)=>
    {
    req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
 
    req.continue((res)=>
    {
       // expect(res.statusCode).to.equal(403)
    })
 }
 ).as("dummyUrl")
 
 cy.get("button[class='btn btn-primary']").click()
 cy.wait('@dummyUrl')
 */
    
it.only('Third API test case',function(){
    cy.request('POST',"http://216.10.245.166/Library/Addbook.php",{

    "name":"Learn Appium Automation with Java",
    "isbn":"bcd",
    "aisle":"227",
    "author":"John foe"
    }
    ).then(function(res){
        expect(res.body).to.have.property('Msg',"Book Already Exists")
        expect(res.status).to.eq(200)

    })
})
    

})