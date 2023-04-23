describe('Navigation', () => {
  it('should navigate to the help page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    
    // Find link to help page
    cy.get('a[href*="help"]').click()

    // The new url should include help
    cy.url().should('include', '/help')

    // The new page should contain an h1 with "About page"
    cy.get('h2').contains("What is f4rm?")
  })
})
