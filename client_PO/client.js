class Client {
  typeFirstName(number, Fname) {
    cy.get("input[name='first_name']").eq(number).clear().type(Fname);

    return this;
  }
  typeeditFirstName(number, Fname) {
    cy.get("#first_name").eq(number).clear().type(Fname);

    return this;
  }

  typeeditLastName(number, Lname) {
    cy.get("#last_name").eq(number).clear().type(Lname);

    return this;
  }
  typeLastName(number, Lname) {
    cy.get("input[name='last_name']").eq(number).clear().type(Lname);

    return this;
  }

  clickClient() {
    cy.get("#clientsMenu").click();

    return this;
  }
  clickAdd() {
    cy.get(".blueButton.button.field").click();

    return this;
  }

  clickSave(value) {
    cy.get(".pull-right .blueButton.button").contains(value).click();

    return this;
  }

  clickCancel(value) {
    cy.get(".pull-right .defaultButton.button").contains(value).click();

    return this;
  }

  typeEmail(number, email) {
    cy.get("input[name='email']").eq(number).clear().type(email);

    return this;
  }

  typeMail(number, email) {
    cy.get("#email").eq(number).clear().type(email);

    return this;
  }

  wait(number) {
    cy.wait(number);

    return this;
  }

  dataVerify(selector, validation, formElement) {
    cy.get(selector).each((selector, index) => {
      cy.get(selector).should(validation, formElement[index]);
    });

    return this;
  }
}
export default Client;
