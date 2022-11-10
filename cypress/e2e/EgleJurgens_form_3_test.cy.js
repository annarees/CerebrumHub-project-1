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
    it('Check that logo is correct and has correct size', () => {
       cy.log('Will check logo source and size')
       cy.get('[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
       cy.get('[data-testid="picture"]').invoke('height').should('be.lessThan', 167).and('be.greaterThan', 165)
       cy.get('[data-testid="picture"]').should('have.attr','height').and('eq','166')
       
    })

// radio button and its content
    it('Check radio button and its content', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

    })
// dropdown and dependencies between 2 dropdowns
    it('dropdown and dependencies', () => {
        cy.get('#country').select('Spain').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        cy.get('#country').select('Estonia').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        cy.get('#country').select('Austria').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    })    

// checkbox, its content and link in it
    it('Check checkbox, its content and link in it', () => {
        cy.get(':nth-child(15) > :nth-child(2)').click().should('be.checked')
        cy.get(':nth-child(15) > :nth-child(2)').next().should('have.text', 'Accept our cookie policy')
        cy.get(':nth-child(15) > :nth-child(2)').next().click()   
        cy.url().should('contain', 'cookiePolicy.html')
        cy.go('back')
  
});
// email format
    it('Verify email format', () => {
        cy.get('.email').type('egle@gmail.ee')
        cy.get('.email').should('contain.value', '@')
        cy.get('.email').should('contain.value', '.ee')
        
    });


    })
       

    

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

describe('Section 2: functional tests', ()=> {

    it('All fields are filled in and validated', () => {
    
        cy.get('#name').type('Kasutaja')
        cy.get('.email').type('egle@artify.ee')
    
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').select('Malaga').invoke('val')
    
        cy.get(':nth-child(8) > input').clear().type('2022-11-10')
        cy.get(':nth-child(9) > :nth-child(4)')
        cy.get('[type="radio"]').check('Monthly').invoke('val')
    
        cy.get('#birthday').type('1986-04-07')
    
        cy.get(':nth-child(1) > .w3-teal > h1')
        cy.get('input[type=file]').selectFile('load_this_file_reg_form_3.txt')

    
        cy.get(':nth-child(15) > :nth-child(2)').check().invoke('val')
        cy.get('.ng-pristine').check().invoke('val')
        cy.get(':nth-child(2) > input').click()
        cy.get('h1').should('have.text', 'Submission received')
    })
    
    it('Only mandatory fields are filled', () => {
        
        MandatoryFields()
        cy.get(':nth-child(2) > input').should('be.enabled').click()
        cy.get('h1').should('have.text', 'Submission received')
        cy.go('back')
        
    });
    
    it('Mandatory fields are absent', () => {
        
        cy.get (MandatoryFields).clear  
        cy.get(':nth-child(2) > input').should('be.disabled')  
    
    });
    
    
    it('If city is already chosen and country is updated, then city choice should be removed', () => {
        cy.get('#country').select('Estonia').invoke('val')
        cy.get('#city').select('Tallinn').invoke('val')
        cy.get('#country').select('Spain').invoke('val')
        cy.get('#city').should('not.have.text', 'Tallinn')

    });

          
    function MandatoryFields() {
        cy.get('input[name="email"]').type('egle@gmail.com')
        cy.get('#country').select('Spain')
        cy.get('#city').select('Malaga')
        cy.get(':nth-child(15) > .ng-pristine').click().should('be.checked')
        cy.get(':nth-child(15) > :nth-child(2)').click().should('be.checked')
      }
    
    });
    

