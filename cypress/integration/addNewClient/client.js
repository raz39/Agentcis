/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import Client from "../../support/Client_PO";
import { format } from "date-fns";

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
      const passportNumber = faker.random.numeric(9);
      const dob = format(faker.date.birthdate(), "yyyy-MM-dd");
      const preferredIntake = format(faker.date.future(), "yyyy-MM-dd");
      const visaExpiryDate = format(faker.date.future(), "yyyy-MM-dd");
      const visaType = faker.word.adjective();
      const clientId = faker.random.numeric(2);
      const name = `${firstName} ${lastName}`;
      const countryCode = "+61";
      const number = `${countryCode}${phoneNumber}`;

      cy.wrap(number).as("phoneNumber");
      cy.wrap(city).as("city");
      cy.wrap(name).as("name");
      cy.wrap(email).as("email");
      cy.wrap(passportNumber).as("passportNumber");

      client.clickOnClientMenu();

      cy.wait(2000);

      client.clickOnAddButton();

      cy.wait(3000);

      cy.get(".inline-block").click();
      cy.wait(3000);

      client
        .typeFirstName(firstName)
        .typeLastName(lastName)
        .typeDateOfBirth(dob)
        .typeClientId(clientId)
        .typeEmail(email)
        .typePhone(phoneNumber)
        .typeAddress(street, city, state, zip_code)
        .typePreferedData(preferredIntake)
        .selectCountryOfPassport()
        .typePassportNumber(passportNumber)
        .typeVisaType(visaType)
        .typeVisaExpiry(visaExpiryDate)
        .selectApplication()
        .selectAssignee();

      cy.wait(3000);

      client.selectFollowers();

      cy.wait(3000);

      client.selectSource();

      cy.wait(3000);

      client.selectTagName();
    });

    it("should verify the functionality of cancel button and verify data are inexistence in list", function () {
      cy.get(".column >.button.defaultButton").click();
      cy.wait(3000);
      client
        .verifyEmail(this.email, "not.have.text")
        .verifyCurrentCity(this.city, "not.have.text")
        .verifyCurrentCountry("not.have.text")
        .verifyFollowers("not.have.text")
        .verifyAssigne("not.have.text")
        .verifyTagName("not.have.text")
        .verifyPassportNumber(this.passportNumber, "not.have.text")
        .verifyPhone(this.phoneNumber, "not.have.text");
    });

    it("should add new client and verify added data existence in list", function () {
      cy.wait(3000);
      cy.get(".submitButton").click({
        force: true,
      });
      cy.wait(3000);

      client
        .verifyEmail(this.email)
        .verifyCurrentCity(this.city)
        .verifyCurrentCountry()
        .verifyPassportNumber(this.passportNumber)
        .verifyFollowers()
        .verifyTagName()
        .verifyAssigne();
    });
  });
});
