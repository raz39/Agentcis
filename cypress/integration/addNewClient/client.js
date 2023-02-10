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
    const errorMessage = [
      "The First Name field is required.",
      "The Last Name field is required.",
      "The Assignee field is required.",
    ];

    client.clickOnClientButton();

    cy.wait(1000);

    client.clickOnAddButton();

    cy.wait(3000);

    client.clickOnSaveButton();

    cy.errorVerification(errorMessage);

    client.clickOnCancelButton();
  });

  context("form fill for create new client dependent test", () => {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.email();

    beforeEach(() => {
      client.clickOnClientButton();

      cy.wait(1000);

      client.clickOnAddButton();

      cy.wait(3000);

      client
        .typeFirstName("1", firstname)
        .typeLastName("1", lastname)
        .typeEmail("1", email);
    });

    it("should verify the functionality of cancel button", () => {
      client
        .clickOnCancelButton()
        .dataVerification("not.have.text", email, firstname, lastname);
    });

    it("should add new client and verify added data is exist in list", () => {
      client.selectAssignee();

      client.clickOnSaveButton();

      cy.wait(3000);

      client.dataVerification("include.text", email, firstname, lastname);
    });

    it("should add new client and verify edited data in list", () => {
      const editfirstname = faker.name.firstName();
      const editlastname = faker.name.lastName();
      const editemail = faker.internet.email();
      const mail = faker.internet.email();

      client.selectAssignee();

      cy.wait(2000);

      client.typeEmail("1", mail).clickOnSaveButton();

      cy.wait(3000);

      client.dataVerification("include.text", mail, firstname, lastname);

      cy.wait(2000);

      client.clickOnActionButton().clickOnDropDownMenu("Edit");

      cy.wait(5000);

      client
        .editFirstName("0", editfirstname)
        .editLastName("0", editlastname)
        .editEmail("0", editemail);

      cy.get(".submit-button-margin .blueButton").click();

      cy.wait(3000);
      
      client.dataVerification(
        "include.text",
        editemail,
        editfirstname,
        editlastname
      );
    });
  });
});
