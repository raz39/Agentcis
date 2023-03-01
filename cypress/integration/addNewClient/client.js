/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import Client from "../../support/POM/Client_PO";

describe("Test for adding new client ", () => {
  const client = new Client();

  before(() => {
    cy.visitMainPage();
    cy.login();
  });

  beforeEach(function () {
    cy.preserveCookies();
  });

  it("should validate empty field verification error", () => {
    const emptyValidationError = [
      "The First Name field is required.",
      "The Last Name field is required.",
      "The Assignee field is required.",
    ];

    client.clickOnClientMenu();

    cy.wait(1000);

    client.clickOnAddButton();

    cy.wait(3000);

    client.clickOnSaveButton();

    cy.verifyValidationErrors(emptyValidationError);

    client.clickOnCancelButton();
  });

  context("form fill for create new client dependent test", () => {
    beforeEach(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const fullName = `${firstName} ${lastName}`.trim();

      cy.wrap(email).as("email");
      cy.wrap(fullName).as("fullName");

      client.clickOnClientMenu();

      cy.wait(2000);

      client.clickOnAddButton();

      cy.wait(2000);

      client
        .typeFirstName(firstName)
        .typeLastName(lastName)
        .typeEmail(email)
        .selectAssignee()
        .selectApplication();
    });

    it("should click on cancel button and verify added data inexistence in list", function () {
      client
        .clickOnCancelButton()
        .verifyName(this.fullName, "not.have.text")
        .verifyEmail(this.email, "not.have.text");
    });

    it("should add new client and verify added data existence in list", function () {
      client.clickOnSaveButton();

      cy.wait(5000);

      client.verifyName(this.fullName).verifyEmail(this.email);
    });

    it("should add new client and verify edited data existence in list", function () {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const fullName = `${firstName} ${lastName}`.trim();

      client.clickOnSaveButton();

      cy.wait(4000);

      client
        .verifyName(this.fullName)
        .verifyEmail(this.email)
        .clickOnActionButton()
        .clickOnDropDownMenu("Edit");

      cy.wait(3000);

      client.editFirstName(firstName).editLastName(lastName).editEmail(email);

      cy.get(".submit-button-margin .blueButton").click();

      cy.wait(3000);

      client.verifyName(fullName).verifyEmail(email);
    });
  });
});
