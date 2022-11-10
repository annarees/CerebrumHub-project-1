// Before each test (it...) load .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

// Workshop #4 assignment:
//
// 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
// 2. Replace text ‘MyPass’ in the first test with your own chosen password (2 places) - passwords should match
// 3. Change phone number in the first test to 555666777
// 4. Change the order of steps in the first test:
//      -first set phone number
//      -then 2 password fields
//      -then username
// 5. Add comment to the first test containing today’s date

describe('This is first test suite, Valeria Grisina', () => {
    describe('Workshop #4 - Tests',  () => {
        it('User can submit data only when valid mandatory values are added', () => {
            // Today is 31.10.2022
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('input[name="password"]').type('MentorsPassword123456')
            cy.get('[name="confirm"]').type('MentorsPassword123456')
            cy.get('#username').type('Something')

            //in order to activate submit button, user has to click somewhere outside the input field
            cy.get('h2').contains('Password').click()

            cy.get('.submit_button').should('be.enabled')
            cy.get('.submit_button').click()

            // Assert that both input and password error messages are not shown
            // next 2 lines check exactly the same, but using different approach
            cy.get('#input_error_message').should('not.be.visible')
            cy.get('#password_error_message').should('have.css', 'display', 'none')

            // Assert that success message is visible
            // next 2 lines check exactly the same, but using different approach
            cy.get('#success_message').should('be.visible')
            cy.get('#success_message').should('have.css', 'display', 'block')
        });

        it('User can use only same both first and validation passwords', () => {
            // Today is 31.10.2022
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('input[name="password"]').type('MentorsPassword123456')
            cy.get('[name="confirm"]').type('MentorsPassword12345')
            cy.get('#username').type('johnDoe')
            // type('{enter}') is clicking native button e.g to click backspace use '{backspace}'
            cy.get('[name="confirm"]').type('{enter}')

            // Scroll to bottom of the page
            cy.window().scrollTo('bottom')

            // Assert that password error message is visible, and message should contain 'Passwords do not match!
            cy.get('#password_error_message').should('be.visible').should('contain','Passwords do not match!')
            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')
            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')
            // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
            cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
        })

        it('User cannot submit data when username is absent', () => {
            // Today is 31.10.2022
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('input[name="password"]').type('MentorsPassword123456')
            cy.get('[name="confirm"]').type('MentorsPassword123456')

            // Scroll back to username input field
            cy.get('#username').scrollIntoView()
            cy.get('#username').clear().type('  ')
            cy.get('h2').contains('Password').click()

            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')

            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')

            // Assert that correct error message is visible and contain Mandatory input field...
            cy.get('#input_error_message').should('be.visible').should('contain','Mandatory input field is not valid or empty!')

            // Assert that username has tooltip with error message
            cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

            // There are 2 options how to check error message visibility: using CSS or simply be.visible
            // none = not visible; block = visible
            cy.get('#input_error_message').should('be.visible')
            cy.get('#input_error_message').should('have.css', 'display', 'block')
        })
    });

    // Workshop #5: create following tests
    describe('Workshop #5 - Tests',  () => {
        it('User cannot submit data when phone number is absent', () => {
            // Add test, similar to previous one with phone number field not filled in
            // All other fields should be entered correctly
            // Assert that submit button is not enabled and that successful message is not visible

            // Today is 31.10.2022
            cy.get('#username').type('johnDoe')
            // Another solution: do not type anything in the field
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777').clear()
            cy.get('input[name="password"]').type('MentorsPassword123456')
            cy.get('[name="confirm"]').type('MentorsPassword123456')

            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')

            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')
        })

        it('User cannot submit data when password and/or confirmation password is absent', () => {
            // Add test, similar to previous one with password field not filled in
            // All other fields should be entered correctly
            // Assert that submit button is not enabled and that successful message is not visible

            // Today is 31.10.2022
            cy.get('#username').type('Username')
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('input[name="password"]').type('MentorsPassword123456')
            // Commenting confirmation field, so I will not have confirmation password filled
            // cy.get('[name="confirm"]').type('MentorsPassword123456')

            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')

            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')
        })

        it('User cannot add letters to phone number', () => {
            // Add steps, when all fields are correctly filled in, except phone number
            // Try typing letters to phone number field
            // Assert that submit button is not enabled and that successful message is not visible

            // Verification, that phone number should contain only numbers
            cy.get('#username').type('Username')
            cy.get('input[name="password"]').type('MentorsPassword123456{enter}')
            cy.get('[name="confirm"]').type('MentorsPassword123456')
            cy.get('[data-testid="phoneNumberTestId"]').type('letters')
            cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
            cy.get('[data-testid="phoneNumberTestId"]').should('not.have.value', 'letters')

            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')

            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')
        })
    });

    describe('Workshop #5 - Additional Exercise - Solutions', () => {
        /**
         * Here and below are described code manipulations that you could do within previously added tests
         * @todo test should click the save button, currently uses Enter button to submit the form
         * Instead: cy.get('[name="confirm"]').type('{enter}')
         * Do: cy.get('body').click(0,0);
         * Or: click on any other element to switch the focus
         */

        /**
         * @todo check that before any typing no messages are present
         * Do: move assert of error / success messages to the start of the test
         * it('Test', () => {
         *     // Firstly assert
         *     cy.get('#input_error_message').should('not.be.visible')
         *     cy.get('#password_error_message').should('not.be.visible')
         *
         *     // Then move to actions with a form
         *      cy.get('#username').type('Something')
         * });
         */

        /**
         * @todo change username locator to get element by placeholder
         * Instead: cy.get('input[name="username"]')
         * Do: cy.get('input[placeholder="John01"]')
         */

        /**
         * @todo scroll not simply to the bottom, but to a specific element
         * Instead: cy.window().scrollTo('bottom')
         * Do: cy.get('bottom').scrollIntoView()
         */

        /**
         * @todo for username, first, make click and then type SomeUsername, but use command chaining
         * Instead: cy.get('#username').type('Something')
         * Do: cy.get('#username').click().type('Something')
         */

        /**
         * @todo add describe additional grouping, for example, Workshop 5 tests can be divided from others with describe(...)
         * See this file as an example of additional grouping
         */

        /**
         * @todo multiple should(...).should(...) can be changed to command chaining using .and(...)
         * Instead:
         * cy.get('#username').type('Something');
         * cy.get('#username').should('be.visible');
         * cy.get('#username').should('have.value', 'Something');
         *
         * Do: cy.get('#username').type('Something').should('be.visible).and('have.value', 'Something');
         */

        /**
         * @todo username in this test uses space as input string, change in to empty (hint: possible backspace can also be used)
         * Instead: cy.get('#username').clear().type('  ')
         * Do: cy.get('#username').type('{selectAll}{backspace}')
         * Or: cy.get('#username').clear()
         */

        /**
         * Below that point there are few new tests that could be possibly added
         * @todo All input fields have correct placeholders
         */
    });

    describe('Workshop #5 - Additional Exercise - New tests', () => {
        it('All input fields have correct placeholders', () => {
            cy.get('#username').should('have.attr', 'placeholder', 'John01');
            cy.get('#firstName').should('have.attr', 'placeholder', 'John');
            cy.get('#lastName').should('have.attr', 'placeholder', 'Smith');
            cy.get('#phoneNumber').should('have.attr', 'placeholder', '8775048423');
            cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Qwerty');
            cy.get('input[name="confirm"]').should('have.attr', 'placeholder', 'Qwerty');
        });

        it('When the page is just loaded then all input fields should be empty',() => {
            cy.get('#username').should('be.empty');
            cy.get('#firstName').should('be.empty');
            cy.get('#lastName').should('be.empty');
            cy.get('#phoneNumber').should('be.empty');
            cy.get('input[name="password"]').should('be.empty');
            cy.get('input[name="confirm"]').should('be.empty');
        });

        it('When the page is just loaded, then submit button and messages are not active', () => {
            cy.get('.submit_button').should('be.disabled')
            cy.get('#success_message').should('not.be.visible')
            cy.get('#input_error_message').should('not.be.visible')
            cy.get('#password_error_message').should('not.be.visible')
        });

        it('Username description should contain "alphabetic" and "numeric"', () => {
            cy.get('#applicationForm > p:nth-child(2)').should('have.text', 'Username string should consist only of alphabetic and numeric characters');
        });

        it('Make some screenshots for separately elements, and the whole page', () => {
            /**
             * @todo after running this test you need to go to Cypress folder
             * Locate new folder called "screenshots"
             * Validate your screenshots
             */

            cy.screenshot(); // Screenshots the whole "visible" part of the page
            cy.get('#username').screenshot(); // Screenshots selected element
        });

        it('Should log to the console',  () => {
            /**
             * Logs are extremely useful to troubleshoot failed tests
             */
            cy.log('I am the output in the Cypress Test body');
        });
    });

    describe('Workshop #5 - Additional Exercise - DRY', () => {
        /**
         * @todo Some test have repeatable code
         * We need to extract this code to a functions
         * This function could be added later to ../support/reusable_functions.js file
         */

        it.only('Should use functions to fill mandatory fields', () => {
            validateInitialFormState();
            fillMandatoryFields('Valeria', '12345678', 'QwertySecure');
        });
    });

    function validateInitialFormState() {
        cy.get('#username').should('have.attr', 'placeholder', 'John01').and('be.empty');
        cy.get('#firstName').should('have.attr', 'placeholder', 'John').and('be.empty');
        cy.get('#lastName').should('have.attr', 'placeholder', 'Smith').and('be.empty');
        cy.get('#phoneNumber').should('have.attr', 'placeholder', '8775048423').and('be.empty');
        cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Qwerty').and('be.empty');
        cy.get('input[name="confirm"]').should('have.attr', 'placeholder', 'Qwerty').and('be.empty');
    }

    function fillMandatoryFields(userName, phoneNumber, password) {
        cy.get('#username').type(userName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type(password)
    }
})