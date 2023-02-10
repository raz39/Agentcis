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

  it("should verify validation error message while submitting without mandatory fields", () => {
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
      const name = `${firstName} ${lastName}`;

      cy.wrap(name).as("name");
      cy.wrap(email).as("email");
      cy.wrap(name).as("name");

      client.clickOnClientMenu();

      cy.wait(2000);

      client.clickOnAddButton();
      cy.wait(2000);

      client.typeFirstName(firstName).typeLastName(lastName).typeEmail(email);
    });

    it("should verify the functionality of cancel button and verify data are not added in list", function () {
      client
        .selectAssignee()
        .selectProduct()
        .clickOnCancelButton()
        .verifyName("not.have.text",this.name).verifyEmail("not.have.text",this.email);
    });

    it("should add new client and verify added data existence in list", function () {
      client.selectAssignee().selectProduct().clickOnSaveButton();

      cy.wait(5000);

      client.verifyName("include.text",this.name).verifyEmail("include.text",this.email);

    });

    it("should add new client and verify edited data in list", function () {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const fullName = `${firstName} ${lastName}`;

      client.selectAssignee().selectProduct().clickOnSaveButton();

      cy.wait(3000);

      client
        .verifyName("include.text",this.name).verifyEmail("include.text",this.email)
        .clickOnActionButton()
        .clickOnDropDownMenu("Edit");

      cy.wait(3000);

      client.editFirstName(firstName).editLastName(lastName).editEmail(email);

      cy.get(".submit-button-margin .blueButton").click();

      cy.wait(3000);

      client.verifyName("include.text",fullName).verifyEmail("include.text",email);
    });
  });
});
