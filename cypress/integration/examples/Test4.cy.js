import 'cypress-file-upload'
describe('Tests',()=>{
  it('Sending value in JS prompts',()=>{
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.window().then((win)=>{
      cy.stub(win,'prompt').returns('welcome')

    })

    cy.get("button[onclick='jsPrompt()']").click()
    cy.get('#result').should('have.text','You entered: welcome')
})
it('JS auth',()=>{
  cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth:{
    username:'admin',
    password:'admin'
  }})
})
it('Second approach',()=>{
  cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
})
it('Handle tabs Approach 1',()=>{
  cy.visit('https://the-internet.herokuapp.com/windows')
  cy.get('.example>a').invoke('removeAttr','target').click()
  cy.url().should('include','new')
  cy.wait(2000)
  cy.go('back')
  
})
it('Handle tabs Approach 2',()=>{
  cy.visit('https://the-internet.herokuapp.com/windows')
  cy.get('.example>a').then((e)=>{
    let url = e.prop('href')
    cy.visit(url)
  })
  cy.url().should('include','new')
  cy.wait(2000)
  cy.go('back')
  
  
})
it('Handling iframes',()=>{
  cy.visit('https://the-internet.herokuapp.com/iframe')

  const iframe = cy.get('#mce_0_ifr').
  its('0.contentDocument.body')
  .should('be.visible')
  .then(cy.wrap)

  iframe.get('.tox-notification__dismiss').click()
  cy.wait(2000)

  iframe.type('HI')
})

it.only('File upload',()=>{
  cy.visit('https://testing.qaautomationlabs.com/file-upload.php')
  cy.get('label.file-label').attachFile('sample.pdf')
  cy.wait(4000)
  cy.get('#fileInfo').should('have.text','sample')
})



})