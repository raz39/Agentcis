class Client {
  typeFirstName(firstName) {
    cy.get("input[name='first_name']").eq(1).clear().type(firstName);

    return this;
  }

  editFirstName(firstName) {
    cy.get("#first_name").clear().type(firstName);

    return this;
  }

  editLastName(lastName) {
    cy.get("#last_name").clear().type(lastName);

    return this;
  }

  typeLastName(LastName) {
    cy.get("input[name='last_name']")
      .eq(1)
      .click()
      .clear()
      .click()
      .type(LastName);

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
          .as("assigneeName")
          .invoke("text")
          .then(() => {
            cy.get("@assigneeName").dblclick();
          });
      });
    });

    return this;
  }

  selectApplication() {
    cy.get("div[name='selectProducts'] > div[role='combobox']").dblclick({
      force: true,
    });

    cy.wait(2000);
  
    cy.get(".form li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get("li[role='option'] > div > div:nth-of-type(1)").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("productName")
          .invoke("text")
          .then(() => {
            cy.get("@productName").click();
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
    cy.get("input[name='email']").eq(1).click().clear().click().type(email);

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

  verifyEmail(email,assertValue="include.text") {
    cy.get(".ag-flex-column p").first().should(assertValue, email);

    return this;
}

verifyName(Name,assertValue="include.text") {
  cy.get(".ag-flex-column a").first().should(assertValue,Name);

  return this;
}
}

export default Client;
