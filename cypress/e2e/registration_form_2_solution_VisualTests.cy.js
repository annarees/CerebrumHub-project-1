beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #6 create following tests:

describe('Section 1: Functional tests', () => {
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
    })

    it('Check that submit button cannot be selected if username is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData()

        // Add steps for emptying username input field

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    //Add more similar tests for checking other mandatory field's absence

})

// Workshop #7 create more visual tests

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
        cy.get('img').should('have.attr', 'height').and('equal','166')
    })

    // Solution to Workshop #7, testing second picture
    it('NEW: Check that second picture is correct and has correct size', () => {
        // next lines do exactly the same, the difference is only in selector
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src','cypress_logo.png')
        cy.get('img').eq(1).should('have.attr', 'src','cypress_logo.png')

        // get element and check its parameter height, to be equal 88
        // next 3 rows do exactly the same
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('equal', 88)
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'height').and('equal','88')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'height', 88)

        // get element and check its parameter width, to be equal 116
        // next 3 rows do exactly the same
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('equal', 116)
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'width').and('equal','116')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'width',116)
    })


    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Check that currently opened URL is value:
        cy.url().should('contain', '/registration_form_1.html')

        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Solution to Workshop #7, testing second URL
    it('NEW: Check that URL to Cerebrum Hub page is correct and clickable', () => {
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
        
        // !!!For next command to work, you need to add to file cypress.config.js:
        // chromeWebSecurity: false
        // click on the second link in navigation, because eq(1) means second element!
        cy.get('nav>a').eq(1).click()
        
        // Check that correct URL is open
        cy.url().should('contain', 'cerebrumhub.com')
        
        // Go back to previous page
        cy.go('back')

        // Check again that correct URL is open
        cy.url().should('contain', 'registration_form_2.html')
    })

    it('Check that radio button list is correct', () => {
        // Array has totally 4 elements
        cy.get('input[type="radio"]').should('have.length', 4)
        /*
        .next() is needed because of HTML structure:
        <input type="radio" id="htmlFavLanguage" name="fav_language" value="HTML">
        <label for="htmlFavLanguage">HTML</label><br>
         */
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('[for="htmlFavLanguage"]').should('have.text', 'HTML')

        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).click().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Solution to Workshop #7, testing checkboxes
    it('NEW: Check that checkbox list is correct', () => {
        // Array has totally 3 elements
        // next 3 rows check exactly the same, the difference is only in the selector
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)
        cy.get('input.vehicles').should('have.length', 3)
        cy.get('.vehicles').should('have.length', 3)
        
        // Check each checkbox text
        // For educational purposes I used different selectors each time
        cy.get('#vehicle1').next().should('have.text','I have a bike').and('not.be.checked')
        cy.get('[for="vehicle2"]').should('have.text','I have a car').and('not.be.checked')
        cy.get('label[for="vehicle3"]').should('have.text','I have a boat').and('not.be.checked')

        // Multiple checkboxes can be selected
        // Function check() or click() can be used
        cy.get('#vehicle1').check().should('be.checked')
        cy.get('#vehicle2').click().should('be.checked')

        // first checkbox is still checked, after checking second checkbox
        cy.get('#vehicle1').should('be.checked')
        
        // Uncheck first checkbox and verify
        cy.get('#vehicle1').uncheck().should('not.be.checked')

        // You can check, verify and uncheck all in one chained command:
        cy.get('#vehicle2').check().should('be.checked')
            .uncheck().should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // Select second element and create screenshot for this area, and full page
        // Don't forget to delete files and comment back if not using
        // cy.get('#cars').select(1).screenshot('Cars drop-down')
        // cy.screenshot('Full page screenshot')

        // Different solutions how get array length of elements in Cars dropdown
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Solution to Workshop #7, testing education favourite animal dropdown
    it('NEW: Favourite animal dropdown is correct', () => {
        // Different solutions how get array length of elements in animal dropdown
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal > option').should('have.length', 6)
        
        // Check content of animal dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal > option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').children().eq(2).should('have.text', 'Snake')
        cy.get('#animal > option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal > option').eq(4).should('have.text', 'Cow')
        cy.get('#animal > option').eq(5).should('have.text', 'Horse')
        
        // Check content of animal dropdown in shorter, but more complex way :)
        // Please notice, that value and text are different for some options!
        // for example, visible text is Cow, but html value is spider
        // <option value="spider">Cow</option>
        cy.get('#animal').children().then(animalList => {
            const listFromPage = [...animalList].map(option => option.value)
            expect(listFromPage).to.deep.equal(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    // To get multiple classes user .class1.class2 selector
    cy.get('#confirm').type('MyPass')
    cy.get('[name="confirm"]').type('InvalidMyPass')
    cy.get('h2').contains('Password').click()
}

