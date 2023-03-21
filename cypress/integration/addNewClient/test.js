// <reference types="cypress" />
import Client from "../../support/POM/Client_PO";

describe("Test for adding new client ", () => {
  const client = new Client();

  before(() => {
    cy.visitMainPage();
    cy.login();
    client.clickOnClientMenu();
    cy.wait(4000);
  });

  // beforeEach(function () {
  //   cy.preserveCookies();
  // });
  //Cypress._.times(200, () => {
    it.only("should archieve the client", () => {
      client.clickOnClientMenu();
      cy.wait(4000)
      // client.clickOnActionButton().clickOnDropDownMenu("Archive");
      // cy.get(".accept").click();
      // cy.get(".ag-alert-show").should(
      //   "include.text",
      //   "Client with in progress application is not allowed to archive."
      // );
      cy.get(".ag-flex-column a").first().click();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      cy.wait(3000);
      cy.get(".defaultNav.nav.nav-tabs > li:nth-of-type(2) > a").click();
      cy.wait(6000);

      cy.get("td:nth-of-type(4)")
      //.eq(3)
      .invoke("text")
      .then((text) => {
          if (text.trim() === "In Progress") {
            cy.get("td a").click({ force: true });
      cy.get(".redButton.text-danger").click();
      cy.get(
        "div[name='discontinue_reason'] > div[role='combobox']"
      ).dblclick();
          
              

          //     cy.get(".ag-menu__item.ag-scroll>a")
          //         .last()
          //         .click({ force: true })
          //         .wait(2000);

          //     documentType_PO
          //         .verifyFirstStatusValue(INACTIVATE_STATUS_LABEL)
          //         .clickOnThreeDotActionButton()
          //         .verifyStatusOnThreeDotActionButton(
          //             ACTIVATE_STATUS_LABEL
          //         );
          // } else {
          //     documentType_PO
          //         .verifyFirstStatusValue(INACTIVATE_STATUS_LABEL)
          //         .clickOnThreeDotActionButton()
          //         .verifyStatusOnThreeDotActionButton(
          //             ACTIVATE_STATUS_LABEL
          //         );

          //     cy.get(".ag-menu__item.ag-scroll>a")
          //         .last()
          //         .click({ force: true })
          //         .wait(2000);

          //     documentType_PO
          //         .verifyFirstStatusValue(ACTIVE_STATUS_LABEL)
          //         .clickOnThreeDotActionButton()
          //         .verifyStatusOnThreeDotActionButton("Deactivate");
          }
      




      // cy.get("td a").click({ force: true });
      // cy.get(".redButton.text-danger").click();
      // cy.get(
      //   "div[name='discontinue_reason'] > div[role='combobox']"
      // ).dblclick();
      cy.get("ul[role='listbox'] li").then(($el) => {
        const random = Math.floor(Math.random() * $el.length);
        cy.wrap($el)
          .eq(random)
          .as("reason")
          .invoke("text")
          .then(() => {
            cy.get("@reason").click();
          });
        cy.get("[name='note']").type("Many user");
        cy.get(".pull-right .blueButton.button").contains("Confirm").click();
        cy.wait(3000);
        cy.get(".ghostButton").contains("Client List").click({ force: true });
        cy.wait(3000);
        client.clickOnActionButton().clickOnDropDownMenu("Archive");
        cy.get(".accept").click();
        cy.wait(3000);
          // cy.get("[href='#/contacts/prospects']").click();
          // cy.wait(4000);
          // client.clickOnActionButton().clickOnDropDownMenu("Archive");
          // cy.get(".accept").click();
          // cy.wait(4000);
          cy.get("[href='#/contacts/archived']").click();
          cy.wait(4000);

          client.clickOnActionButton().clickOnDropDownMenu("Delete");

          cy.get(".accept").click();
          cy.reload();
          cy.wait(4000)
      });
    });
  });


  Cypress._.times(200, () => {
    it("should archive the prospect", () => {
      cy.get("[href='#/contacts/prospects']").click();
      cy.wait(2000);
      client.clickOnActionButton().clickOnDropDownMenu("Archive");
      cy.get(".accept").click();

      cy.get("[href='#/contacts/archived']").click();
      cy.wait(2000);

      client.clickOnActionButton().clickOnDropDownMenu("Delete");

      cy.get(".accept").click();
      cy.reload();
    });
  });
  Cypress._.times(200, () => {
    it("should delete the client", () => {
      cy.get("[href='#/contacts/archived']").click();
      cy.wait(3000);

      client.clickOnActionButton().clickOnDropDownMenu("Delete");

      cy.get(".accept").click();
      cy.reload();
    });
  });
});
