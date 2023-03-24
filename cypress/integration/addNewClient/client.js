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
      const phoneNumber = faker.phone.number("42#######");
      const street = faker.address.streetAddress();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const zip_Code = faker.address.zipCode();
      const state = faker.address.state();
      const city = faker.address.city();
      const passportNumber = faker.random.numeric(9);
      const dob = format(faker.date.birthdate(), "MM-dd-yyyy");
      const preferredIntake = format(faker.date.future(), "MM-dd-yyyy");
      const visaExpiryDate = format(faker.date.future(), "MM-dd-yyyy");
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

      cy.interception();

      client.clickOnClientMenu();

      cy.wait("@list");

      client.clickOnAddButton();

      cy.get(".inline-block").click();

      cy.get("#uploadProfileImage").attachFile("photo.jpg");

      cy.wait(2000);

      cy.get("main#profileImageUpload-content .blueButton.button").click();
      cy.get("[class='text-center col-v-1'] .text-muted").click();

      client
        .typeFirstName(firstName)
        .typeLastName(lastName)
        .typeDateOfBirth(dob)
        .typeClientId(clientId)
        .typeEmail(email)
        .typePhone(phoneNumber)
        .typeAddress(street, city, state, zip_Code)
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

    it("should click on cancel button and verify data inexistence in list", function () {
      cy.get(".column >.button.defaultButton").click();

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
      cy.get(".submitButton").click({
        force: true,
      });
      cy.wait(4000);
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
