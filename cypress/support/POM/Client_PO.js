class Client {
  typeFirstName(firstName) {
    cy.get("input[name='first_name']").eq(1).clear().type(firstName);

    return this;
  }

  editFirstName(FirstName) {
    cy.get("#first_name").clear().type(FirstName);

    return this;
  }

  editLastName(LastName) {
    cy.get("#last_name").clear().type(LastName);

    return this;
  }

  typeLastName(LastName) {
    cy.get("input[name='last_name']").eq(1).clear().type(LastName);

    return this;
  }

  clickOnClientMenu() {
    cy.get("#clientsMenu").click();

    return this;
  }

  clickOnAddButton() {
    cy.get(".blueButton.button.field").click();

    return this;
  }

  clickOnSaveButton() {
    cy.get(".pull-right .blueButton.button").contains("Save").click();

    return this;
  }

  selectAssignee() {
    cy.get("div[name='assignee'] > div[role='combobox'] i").dblclick();

    cy.get(".form li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".form .col-hr-2").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("name")
          .invoke("text")
          .then((name) => {
            cy.get("@name").dblclick();
          });
      });
    });

    return this;
  }

  selectProduct() {
    cy.get("div[name='selectProducts'] > div[role='combobox']").dblclick({
      force: true,
    });
    cy.wait(2000);
    cy.get(".form li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get("li[role='option'] > div > div:nth-of-type(1)").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("name")
          .invoke("text")
          .then((name) => {
            cy.get("@name").click();
          });
      });
    });
    cy.get("div[name='selectProducts'] > div[role='combobox'] i").click({
      force: true,
    });

    return this;
  }

  clickOnCancelButton() {
    cy.get(".pull-right .defaultButton.button").contains("Cancel").click();

    return this;
  }

  typeEmail(email) {
    cy.get("input[name='email']").eq(1).clear().type(email);

    return this;
  }

  editEmail(email) {
    cy.get("#email").clear().type(email);

    return this;
  }

  dataValidation(selector, validation, formElement) {
    cy.get(selector).each((selector, index) => {
      cy.get(selector).should(validation, formElement[index]);
    });

    return this;
  }

  clickOnActionButton() {
    cy.get("tr:first-child>td:last-child").click();

    return this;
  }

  clickOnDropDownMenu(menu) {
    cy.get("td .transparent-button").contains(menu).click();

    return this;
  }

  verifyEmail(assertValue, email) {
    cy.get(".ag-flex-column p").first().should(assertValue, email);

    return this;
}

verifyName(assertValue,fullName) {
  cy.get(".ag-flex-column a").first().should(assertValue, fullName);

  return this;
}
}

export default Client;
