/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import Client from "../../../client_PO/client";

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
    const selector = [".js-input-error", ".js-input-error", ".js-input-error"];
    const errorMessage = [
      "The First Name field is required.",
      "The Last Name field is required.",
      "The Assignee field is required.",
    ];

    client
      .clickClient()
      .wait(1000)
      .clickAdd()
      .wait(1000)
      .clickSave("Save")
      .dataVerify(selector, "include.text", errorMessage)
      .clickCancel("Cancel");
  });

  context("form fill for create new client dependent test", () => {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.email();

    beforeEach(() => {
      client
        .clickClient()
        .wait(1000)
        .clickAdd()
        .wait(1000)
        .typeFirstName("1", firstname)
        .typeLastName("1", lastname)
        .typeEmail("1", email);
    });

    it("should verify the functionality of cancel button", () => {
      client.clickCancel("Cancel");
    });

    it("should add new client and verify added data is exist in list", () => {
      client.clickSave("Save").wait(3000);

      cy.get(".ag-flex-column p").first().should("include.text", email);
      cy.get(".ag-flex-column a")
        .first()
        .should("include.text", firstname + " " + lastname);
    });

    it("should add new client and verify edited data in list", () => {
      const editfirstname = faker.name.firstName();
      const editlastname = faker.name.lastName();
      const editemail = faker.internet.email();
      const mail = faker.internet.email();

      client.typeEmail("1", mail).clickSave("Save").wait(3000);

      cy.get(".ag-flex-column p").first().should("include.text", mail);
      cy.get(".ag-flex-column a")
        .first()
        .should("include.text", firstname + " " + lastname);
      cy.get("tr>td:nth-child(18)").first().click();
      cy.get(
        ".ag-menu__item [class='transparent-button width-100p']:nth-of-type(2)"
      ).click();

      client
        .wait(5000)
        .typeeditFirstName("0", editfirstname)
        .typeeditLastName("0", editlastname)
        .typeMail("0", editemail);

      cy.get(".submit-button-margin .blueButton").click();

      client.wait(3000);

      cy.get(".ag-flex-column p").first().should("include.text", editemail);
      cy.get(".ag-flex-column a")
        .first()
        .should("include.text", editfirstname + " " + editlastname);
    });
  });
});
