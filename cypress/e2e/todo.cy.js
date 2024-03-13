import '@testing-library/cypress/add-commands';

describe('Check chart pages', () => {
  it('Chart is correctly generated', () => {
    cy.visit('http://localhost:8080');

    cy.contains('Line').click();

    // Set chart details
    cy.findByTestId('chart-title-input').type('Test Chart');
    cy.findByTestId('x-label-input').type('Points 1');
    cy.findByTestId('y-label-input').type('Points 2');

   // Add points 
   // Select the element with class .x-value-input
   cy.get('.x-value-input').type('1'); 
   cy.get('.y-value-input').type('2');

   // Click the "+" button to add more points
   cy.contains('+').click();
   // Select 2nd input window to input points
   cy.get('.x-value-input').eq(1).type('3');
   cy.get('.y-value-input').eq(1).type('4');

    // Generate chart
    cy.findByRole('button', { name: 'Generate chart' }).click();

    // Assert that the chart image appeared
    cy.findByTestId('chart-display').find('img').should('be.visible');
  });

  it('Maintain Data', () => {
    cy.visit('http://localhost:8080');

    cy.contains('Line').click();

    // Set chart details
    cy.findByTestId('chart-title-input').type('Test Chart');
    cy.findByTestId('x-label-input').type('Points 1');
    cy.findByTestId('y-label-input').type('Points 2');

   // Add points 
   // Select the element with class .x-value-input
   cy.get('.x-value-input').type('1'); 
   cy.get('.y-value-input').type('2');

   // Click the "+" button to add more points
   cy.contains('+').click();
   // Select 2nd input window to input points
   cy.get('.x-value-input').eq(1).type('3');
   cy.get('.y-value-input').eq(1).type('4');

   // Click Scatter link
  cy.contains('Scatter').click();

  // Verify individual data points after navigating to Scatter
  cy.get('.x-value-input').eq(0).should('have.value', '1');
  cy.get('.y-value-input').eq(0).should('have.value', '2');
  cy.get('.x-value-input').eq(1).should('have.value', '3');
  cy.get('.y-value-input').eq(1).should('have.value', '4');

  // Click Bar link
  cy.contains('Bar').click();

  // Verify individual data points after navigating to Bar
  cy.get('.x-value-input').eq(0).should('have.value', '1');
  cy.get('.y-value-input').eq(0).should('have.value', '2');
  cy.get('.x-value-input').eq(1).should('have.value', '3');
  cy.get('.y-value-input').eq(1).should('have.value', '4');
  });

  it('Saving Chart', () => {
    cy.visit('http://localhost:8080');

    cy.contains('Line').click();

    // Set chart details
    cy.findByTestId('chart-title-input').type('Test Chart');
    cy.findByTestId('x-label-input').type('Points 1');
    cy.findByTestId('y-label-input').type('Points 2');

   // Add points 
   // Select the element with class .x-value-input
   cy.get('.x-value-input').type('1'); 
   cy.get('.y-value-input').type('2');

   // Click the "+" button to add more points
   cy.contains('+').click();
   // Select 2nd input window to input points
   cy.get('.x-value-input').eq(1).type('3');
   cy.get('.y-value-input').eq(1).type('4');

    // Generate chart
    cy.findByRole('button', { name: 'Generate chart' }).click();
    cy.findByRole('button', { name: 'Save chart' }).click();
    
    cy.contains('Gallery').click();

    // Assert that the saved chart is present by looking for its title
    cy.contains('Test Chart').should('exist');
  });

  it('Reopen After Saving', () => {
    cy.visit('http://localhost:8080');

    cy.contains('Line').click();

    // Set chart details
    cy.findByTestId('chart-title-input').type('Test Chart');
    cy.findByTestId('x-label-input').type('Points 1');
    cy.findByTestId('y-label-input').type('Points 2');

   // Add points 
   // Select the element with class .x-value-input
   cy.get('.x-value-input').type('1'); 
   cy.get('.y-value-input').type('2');

   // Click the "+" button to add more points
   cy.contains('+').click();
   // Select 2nd input window to input points
   cy.get('.x-value-input').eq(1).type('3');
   cy.get('.y-value-input').eq(1).type('4');

    // Generate chart
    cy.findByRole('button', { name: 'Generate chart' }).click();
    cy.findByRole('button', { name: 'Save chart' }).click();
    
    cy.contains('Gallery').click();
    cy.contains('Test Chart').click();

    // Assert that title of the page should exist 
    cy.contains('Line Chart Builder').should('exist');
  });

});
