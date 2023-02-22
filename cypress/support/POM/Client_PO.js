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
    cy.get("input[name='last_name']").eq(1).click().clear().click().type(LastName);

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
      cy.get(".ag-select-element").then((text) => {
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
    cy.get("[name] .formPage-lg:nth-child(12) [aria-hidden]").click({
      force: true,
    });

    return this;
  }

  selectCountryOfPassport() {
    cy.get("div[name='countryPassport'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap").dblclick({
      force: true,
    });
    cy.wait(2000);
    cy.get(".ag-select-list-wrapper li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("name")
          .invoke("text")
          .then((name) => {
            cy.get("@name").click();
            cy.log(name);
          });
      });
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
typeDate(){
cy.get("#DOB").type("2007-02-01")
cy.get("[max-date] .label").click();

return this;
}

typeClientId(){
  cy.get("input[name='client_identifier']").dblclick().type("12");

  return this;
}

typePhone(){
cy.get(".ui.input").eq(3).type("0412345678");

return this;
}
typeAddress(street,city,state,zip_code){
  cy.get("h4:nth-of-type(3)").click();
  cy.get("input[name='street'").type(street);
  cy.get("input[name='city'").type(city);
  cy.get("input[name='state'").type(state);
  cy.get("input[name='zip_code'").type(zip_code);
  cy.get("div[name='country'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap").dblclick({
    force: true,
  });
  cy.wait(2000);
  cy.get(".ag-select-list-wrapper li").then(($el) => {
    const random = Math.floor(Math.random() * $el.length);
    cy.get(".ag-select-element").then((text) => {
      cy.wrap(text)
        .eq(random)
        .as("name")
        .invoke("text")
        .then((name) => {
          cy.get("@name").click();
          cy.log(name);
        });
    });
  });
  return this;
  }

  typePreferedData(){
    cy.get("form[name='clientForm'] > h4:nth-of-type(4)").click();
    cy.get("#preferredIntake").type("2007-02-01");

    return this;
  }

  typePassportNumber(){
    cy.get("input[name='passport_number']").type("1234567");
  
    return this;
  }

  typeVisaType(){
    cy.get("input[name='visa_type']").type("none");
  
    return this;
  }

  typeVisaExpiry(){
    cy.get("#visaExpiry").type("2010-02-01");

    return this;
  }

}

export default Client;
