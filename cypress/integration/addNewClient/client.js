/// <reference types="cypress" />
import Client from "../../support/Client_PO";

describe("Test for adding new client ", () => {
  const client = new Client();

  before(() => {
    cy.visitMainPage();
    cy.login();
  });

  // beforeEach(function () {
  //   cy.preserveCookies();
  // });

  it("should click on cancel button and verify data inexistence in list", function () {
    cy.get(
      ".ag-top-toolbar__menu__item:nth-of-type(8) .ag-top-toolbar__menu__item__link"
    ).click();
    cy.get(
      ".ag-setting-sidebar__scrollable .ag-flex-column:nth-of-type(1) .ag-setting__title"
    ).click();
    cy.wait(4000)
    cy.get('.nav > :nth-child(2) > a').click();
    cy.domain();
  });
});
