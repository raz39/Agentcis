let assignee;
let countryOfPassport;
let followers;
let sources;
let tagName;

class Client {

  typeFirstName(firstName) {
    cy.get("input[name='first_name']").eq(1).clear().type(firstName);

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
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("assignee")
          .invoke("text")
          .then((name) => {
            cy.get("@assignee").dblclick();
            assignee = name;
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
    cy.get(
      "div[name='selectProducts'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-select-icon"
    ).click({
      force: true,
    });

    return this;
  }

  selectCountryOfPassport() {
    cy.get(
      "div[name='countryPassport'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap"
    ).dblclick({
      force: true,
    });
    cy.wait(2000);
    cy.get(".ag-select-list-wrapper li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("countryOfPassport")
          .invoke("text")
          .then((name) => {
            cy.get("@countryOfPassport").click();
            countryOfPassport = name.trim();
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
  verifyName(fullName, assertValue = "include.text") {
    cy.get(".ag-flex-column a")
      .first().should(assertValue,fullName);

    return this;
  }

  typeDate() {
    cy.get("#DOB").type("2007-02-01");
    cy.get("[max-date] .label").click();

    return this;
  }

  typeClientId() {
    cy.get("input[name='client_identifier']").dblclick().type("12");

    return this;
  }

  typePhone() {
    cy.get(".ui.input").eq(3).type("0412345678");

    return this;
  }

  typeAddress(street, city, state, zip_code) {
    cy.get("h4:nth-of-type(3)").click();
    cy.get("input[name='street'").type(street);
    cy.get("input[name='city'").type(city);
    cy.get("input[name='state'").type(state);
    cy.get("input[name='zip_code'").type(zip_code);
    cy.get(
      "div[name='country'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap"
    ).dblclick({
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

  typePreferedData() {
    cy.get("form[name='clientForm'] > h4:nth-of-type(4)").click();
    cy.get("#preferredIntake").type("2007-02-01");

    return this;
  }

  typePassportNumber() {
    cy.get("input[name='passport_number']").type("1234567");

    return this;
  }

  typeVisaType() {
    cy.get("input[name='visa_type']").type("none");

    return this;
  }

  typeVisaExpiry() {
    cy.get("#visaExpiry").type("2010-02-01");

    return this;
  }

  selectFollowers() {
    cy.get(
      "div[name='followers'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap > .ag-select-label.truncate"
    ).dblclick();
    cy.get(".ag-select-element").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("followers")
          .invoke("text")
          .then((name) => {
            cy.get("@followers").dblclick();
            followers = name;
          });
      });
    });

    return this;
  }

  selectSource() {
    cy.get(
      "div[name='source'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap"
    ).dblclick();
    cy.get(".ag-select-element").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("source")
          .invoke("text")
          .then((name) => {
            cy.get("@source").click();
            sources = name;
            cy.log(name);
          });
      });
    });

    return this;
  }

  SelectTagName() {
    cy.get(".column:nth-of-type(4) .ag-select-label").dblclick();
    cy.wait(3000);
    cy.get(".ag-select-element").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.get(".ag-select-element").then((text) => {
        cy.wrap(text)
          .eq(random)
          .as("tagName")
          .invoke("text")
          .then((name) => {
            cy.get("@tagName").click();
            tagName = name.trim();
            cy.get(
              "div[name='tags'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-select-icon"
            ).click({
              force: true,
            });
          });
      });
    });

    return this;
  }

  verifyTagName(assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(4) .ag-flex").should(
      assertValue,
      tagName
    );

    return this;
  }
  verifyAssigne(assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(4) .ag-flex").should(
      assertValue,
      assignee
    );

    return this;
  }
  verifyCountryOfPassport(assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(12)").should(
      assertValue,
      countryOfPassport
    );

    return this;
  }
  verifyFollowers(assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(4) .ag-flex").should(
      assertValue,
      followers
    );

    return this;
  }

  verifySources(assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(4) .ag-flex").should(
      assertValue,
      sources
    );

    return this;
  }

  verifyPhone(phone, assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(4) .ag-flex").should(
      assertValue,
      phone
    );

    return this;
  }

  verifyCurrentCity(city, assertValue = "include.text") {
    cy.get("td:nth-of-type(13) > span").first().should(assertValue, city);

    return this;
  }
}

export default Client;
