Cypress.Commands.add("login", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  cy.get("#email").clear().type(email);
  cy.get("#password").clear().type(password);
  cy.get("#loginButton").click();
  cy.url().should("include", "/overview");
});

Cypress.Commands.add("preserveCookies", () => {
  Cypress.Cookies.preserveOnce("Agentcis", "laravel_token");
});

Cypress.Commands.add("visitMainPage", () => {
  cy.visit(Cypress.env("baseUrl"));
});

Cypress.Commands.add("errorVerification", (selectors) => {
  cy.get(".form .js-input-error").each((selector, index) => {
    cy.get(selector).should("include.text", selectors[index]);
  });
});
