class Client {
  typeFirstName(index, firstname) {
    cy.get("input[name='first_name']").eq(index).clear().type(firstname);

    return this;
  }

  editFirstName(index, Firstname) {
    cy.get("#first_name").eq(index).clear().type(Firstname);

    return this;
  }

  editLastName(index, Lastname) {
    cy.get("#last_name").eq(index).clear().type(Lastname);

    return this;
  }

  typeLastName(index, Lastname) {
    cy.get("input[name='last_name']").eq(index).clear().type(Lastname);

    return this;
  }

  clickOnClientMenu() {
    cy.get("#clientsMenu").click();

    return this;
  }

  clickOnServicesMenu() {
    cy.get("#servicesMenu").click();

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

  selectService(){
    cy.get(".ag-select-icon > i").eq(2).dblclick();
    cy.wait(4000)
    cy.get(".ag-select-list").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq("1")
          .as("name")
          .invoke("text")
          .then((name) => {
            cy.get("@name").click();
            cy.log(name)
            //cy.get("[class='field col-hr-1 services-head__choose-service'] .ag-align-center").click()
          });
      });
    });
return this;
  }


  selectFor(){
    cy.get(".ag-select-icon > i").eq(3).dblclick();
    cy.wait(4000)
    cy.get(".ag-select-list").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq("1")
          .as("name")
          .invoke("text")
          .then((name) => {
            cy.get("@name").click();
            cy.get(".ag-select-icon > i").eq(3).dblclick();
            cy.log(name)
          });
      });
    });
return this;
  }


  selectAssignee() {
    cy.get("div[name='assignee'] > div[role='combobox'] i").dblclick();
    cy.get(".form li").first().click();

    return this;
  }

  selectProduct() {
    cy.get("div[name='selectProducts'] > div[role='combobox']").click({
      force: true,
    });
    cy.get("ul[role='listbox'] > li").eq(2).click({ force: true });
    cy.get("div[name='selectProducts'] > div[role='combobox'] i").click({
      force: true,
    });

    return this;
  }

  clickOnCancelButton() {
    cy.get(".pull-right .defaultButton.button").contains("Cancel").click();

    return this;
  }

  typeEmail(index, email) {
    cy.get("input[name='email']").eq(index).clear().type(email);

    return this;
  }

  editEmail(index, email) {
    cy.get("#email").eq(index).clear().type(email);

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
