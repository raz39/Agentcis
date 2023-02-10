Cypress.Commands.add("login", () => {
  //cy.visit(Cypress.env("baseUrl"));
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  cy.get("#email").clear().type(username);
  cy.get("#password").clear().type(password);
  cy.get("[type='submit']").click();
  cy.url().should("include", "/overview");
});

Cypress.Commands.add("preserveCookies", () => {
  Cypress.Cookies.preserveOnce("Agentcis","laravel_token");
});

Cypress.Commands.add("visitMainPage", () => {
  cy.visit(Cypress.env("baseUrl"));
});

