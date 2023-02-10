// <reference types="cypress" />
import Client from "../../support/POM/Client_PO";

describe("Test for adding new client ", () => {
  const client = new Client();

  before(() => {
    cy.visitMainPage();
    cy.login();
  });

  it("should verify validation error message while submitting without mandatory fields", () => {
    client.clickOnClientMenu();
    cy.wait(4000);
    client.clickOnActionButton().clickOnDropDownMenu("Archive");
    cy.get(".accept").click();
    cy.get(".ag-alert-show").should(
      "include.text",
      "Client with in progress application is not allowed to archive."
    );

    cy.get("[href='#/contacts/prospects']").click();
    cy.wait(4000);
    cy.get(".ag-flex-column a")
      .first()
      .invoke("text")
      .then((rajeev) => {
        client.clickOnActionButton().clickOnDropDownMenu("Archive");
        cy.get(".accept").click();
        cy.wait(4000);
        cy.get("[href='#/contacts/archived']").click();
        cy.wait(4000);
        //client.nameVerification("have.text",rajeev);
        cy.get(".ag-flex-column a").first().should("have.text", rajeev);
        cy.wait(4000);

        client.clickOnActionButton().clickOnDropDownMenu("Restore");

        cy.get(".accept").click();
        cy.wait(4000);
        cy.get("[href='#/contacts/prospects']").click();
        //client.nameVerification("have.text",rajeev);
        cy.get(".ag-flex-column a").first().should("have.text", rajeev);

        client.clickOnActionButton().clickOnDropDownMenu("Archive");

        cy.get(".accept").click();
        cy.wait(4000);
        cy.get("[href='#/contacts/archived']").click();
        cy.wait(4000);

        client.clickOnActionButton().clickOnDropDownMenu("Delete");

        cy.get(".accept").click();
        //since the deleted data is not remove from the table unless we refresh the page.
        cy.reload();
        //client.nameVerification("not.have.text",rajeev);
        cy.get(".ag-flex-column a").first().should("not.have.text", rajeev);
      });
  });
});
