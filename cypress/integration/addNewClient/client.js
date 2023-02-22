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

    cy.get(".inline-block").click();

    cy.get(".submitButton").click();

    cy.verifyValidationErrors(emptyValidationError);

    //client.clickOnCancelButton();
  });

  context("form fill for create new client dependent test", () => {
    beforeEach(() => {
      const firstName = faker.name.firstName();
      const phoneNumber = faker.phone.number("04########");
      const street = faker.address.streetAddress();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const zip_code = faker.address.zipCode();
      const state = faker.address.state();
      const city = faker.address.city();
      const name = `${firstName} ${lastName}`;

      cy.wrap(name).as("name");
      cy.wrap(email).as("email");
      cy.wrap(name).as("name");

      client
        .typeFirstName(firstName)
        .typeLastName(lastName)
        .typeDate()
        .typeEmail(email)
        .typeClientId()
        .typePhone(phoneNumber)
        .typeAddress(street, city, state, zip_code)
        .typePreferedData()
        .typePassportNumber()
        .typeVisaType()
        .typeVisaExpiry()
        .selectCountryOfPassport()
        .selectProduct()
        .selectAssignee();
    });

    it("should verify the functionality of cancel button and verify data are not added in list", function () {
      cy.get(".submitButton").dblclick();
      client
        .verifyName("include.text", this.name)
        .verifyEmail("include.text", this.email);
    });
  });
});
