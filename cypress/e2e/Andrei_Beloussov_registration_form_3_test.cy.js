beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
//Workshop #8 add visual tests for registration form 3
/*
Task list:
* Create first test suite for visual tests
* Create tests to verify visual parts of the page:
    * radio button and its content
    * dropdown and dependencies between 2 dropdowns
    * checkbox, its content and link in it
    * email format
 */

describe('Section 1: visual tests', ()=> {
    it('This is my first test', () => {
        // This is empty template
    });


it('First test suite', () => {
    
// Radio button and its content
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

// Dropdown and dependencies between 2 dropdowns
        cy.get('#country').scrollIntoView()
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('not.have.text')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

 // Assert that when Estonia selected, than 3 cities are available and they are Tallinn, Haapsalu, Tartu

        cy.get('#country').select('Estonia')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('not.have.text')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

 // Checkbox, its content and link in it

        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy')
        cy.get('input[type="checkbox"]').next().eq(1).click()
        cy.get('#successMessage').should('be.visible')
        cy.go('back')

 // Email format

        cy.get('.email').type('myemail@test3.ee')
        cy.get('[ng-show="myForm.email.$error.email"]').should('not.be.visible')

 // Assert that email should be correct format

        cy.get('.email').clear().type('myemailtest3.ee')
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible')

    })

});


//Workshop #9 add functional tests for registration form 3
/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (use function)
    * If city is already chosen and country is updated, then city choice should be removed
    * Bonus task: add file (google yourself for solution)
* Rename file registration_form_3_test.cy.js to contain your name - JohnSmith_form_3_test.cy.js and upload your individual result to  team confluence
 */


    describe('Functional tests for registration form 3', () => {
    it('all fields are filled in + validation', () => {
        
        AllFieldsAndValidation ()
     

    });

      it('only mandatory fields are filled in + validations', () => {

        cy.get('#name').clear().type('Andrei')  
        cy.get('.email').type('andreitest@email.test')

        // Email validation
        cy.get('[ng-show="myForm.email.$error.email"]').should('not.be.visible')

        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="radio"]').eq(0).check()
        cy.get('.ng-pristine').check()

     // Assert that Submit button is visible
        cy.get(':nth-child(2) > input').should('be.enabled')  

        // Submit for and assert that is submitted successfully
        cy.get(':nth-child(2) > input').click()
     
        cy.get('h1').should('have.text', 'Submission received')
      
    });

    it('Mandatory fields are absent + validations (use function)', () => {

        AllFields ()

        //Email is absent
        cy.get('.email').clear()
        cy.get('#emailAlert > span > span:nth-child(1)').should('be.visible').and('have.text', 'Email is required.')

        //Country is absent
        cy.get('#country').select('')
        cy.get('#country').should('not.be.selected')

        //Uncheck Accept out privacy policy
        cy.get(':nth-child(15) > .ng-dirty').uncheck()

        //Assert that submit button is disabled, as mandatory fields are not selected
        
         cy.get(':nth-child(2) > input').should('be.disabled')  
 
    });

    it('If city is already chosen and country is updated, then city choice should be removed', () => {

        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('#country').select('Spain')
        cy.get('#city').should('not.be.selected')
        cy.get(':nth-child(2) > input').should('be.disabled')  
        
    });


    it('Bonus task: add file (google yourself for solution)', () => {

        const filepath='C:/Users/Andrei.Beloussov/OneDrive - Fleet Complete HQ/Desktop/genius.jpg'
        cy.get('#myFile').click().selectFile(filepath)
        cy.get('.w3-container > [type="submit"]').click()
        cy.get('h1').should('have.text', 'Submission received')


        


        
    });

    function AllFieldsAndValidation() {
         //All fields are filled in + validation
   
     cy.get('#name').clear().type('Andrei')  
     cy.get('.email').type('andreitest@email.test')
     // Email validation
     cy.get('[ng-show="myForm.email.$error.email"]').should('not.be.visible')
     cy.get('#country').select('Estonia')
     cy.get('#city').select('Tallinn')
     cy.get(':nth-child(8) > input').type('1985-06-03')
     cy.get('input[type="radio"]').eq(0).check()
     cy.get('#birthday').type('1985-06-03')
     cy.get('.ng-pristine').check()
     // Assert that Submit button is visible
     cy.get(':nth-child(2) > input').should('be.enabled')  

     cy.get('input[type="checkbox"]').check()

     // Submit form and assert that is submitted successfully
     cy.get(':nth-child(2) > input').click()
     
     cy.get('h1').should('have.text', 'Submission received')
     cy.wait(3000)
     cy.go('back')  
    }

    function AllFields () {
        cy.get('#name').clear().type('Andrei')  
        cy.get('.email').type('andreitest@email.test')
        // Email validation
        cy.get('[ng-show="myForm.email.$error.email"]').should('not.be.visible')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get(':nth-child(8) > input').type('1985-06-03')
        cy.get('input[type="radio"]').eq(0).check()
        cy.get('#birthday').type('1985-06-03')
        cy.get('.ng-pristine').check()
        // Assert that Submit button is visible
        cy.get(':nth-child(2) > input').should('be.enabled')  
   
        cy.get('input[type="checkbox"]').check() 
    }
    
})