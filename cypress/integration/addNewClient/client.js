/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import Client from "../../support/Client_PO";
describe("Test for adding new client ", () => {
  const client = new Client();

  before(() => {
    cy.visitMainPage();
    cy.login();
  });

  beforeEach(function () {
    cy.preserveCookies();
  });


  context("form fill for create new client dependent test", () => {
    beforeEach(function () {
      const firstName = faker.name.firstName();
      const phoneNumber = faker.phone.number("04########");
      const street = faker.address.streetAddress();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const zip_code = faker.address.zipCode();
      const state = faker.address.state();
      const city = faker.address.city();
      const name = `${firstName} ${lastName}`;
      const countryCode = "+61";
      const number = `${countryCode}${phoneNumber}`;

      cy.wrap(number).as("phoneNumber");
      cy.wrap(city).as("city");
      cy.wrap(name).as("name");
      cy.wrap(email).as("email");

      client.clickOnClientMenu();

      cy.wait(2000);

      client.clickOnAddButton();

      cy.wait(3000);

      cy.get(".inline-block").click();
      cy.wait(3000);
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
        .selectApplication()
        .selectAssignee();

      cy.wait(3000);

      client.selectFollowers();

      cy.wait(3000);

      client.selectSource();

      cy.wait(3000);

      client.SelectTagName();
    });

    it("should verify the functionality of cancel button and verify data are not added in list", function () {

      cy.get(".column >.button.defaultButton").click()
      })

    it("should add new client and verify added data existence in list", function () {
      cy.get(".submitButton").dblclick();
      cy.wait(3000);
      client
        .verifyEmail("include.text", this.email)
        .verifyCurrentCity(this.city)
        .verifyCurrentCountry()
        .verifyPassportNumber("1234567")
        .verifyFollowers()
        .verifyAssigne();
    });
  });
});

