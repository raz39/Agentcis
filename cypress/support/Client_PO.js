let assignee;
let countryOfPassport;
let followers;
let sources;
let tagName;
let currentCountry;
let phone;

class Client {
  typeFirstName(firstName) {
    cy.get("input[name='first_name']").eq(1).clear().type(firstName);

    return this;
  }

  typeLastName(lastName) {
    cy.get("input[name='last_name']")
      .eq(1)
      .click()
      .clear()
      .click()
      .type(lastName);

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
            assignee = name.replace(/\((.*?)\)/g, "").trim();
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
          .as("application")
          .invoke("text")
          .then((name) => {
            cy.get("@application").click();
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

    cy.wait(3000);

    cy.get(".ag-select-list-wrapper li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.wrap($el)
        .eq(random)
        .as("countryOfPassport")
        .invoke("text")
        .then((name) => {
          cy.get("@countryOfPassport").click();
          countryOfPassport = name.trim();
        });
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

  verifyEmail(email, assertValue = "include.text") {
    cy.get(".ag-flex-column p").first().should(assertValue, email);

    return this;
  }

  verifyName(fullName, assertValue = "include.text") {
    cy.get(".ag-flex-column a").first().should(assertValue, fullName);

    return this;
  }

  typeDateOfBirth(date) {
    cy.get("#DOB").type(date);
    cy.get("[max-date] .label").click();

    return this;
  }

  typeClientId(clientId) {
    cy.get("input[name='client_identifier']")
      .click()
      .clear()
      .click()
      .type(clientId);

    return this;
  }

  typePhone(phone) {
    cy.get(".ui.input").eq(3).type(phone);

    return this;
  }

  typeAddress(street, city, state, zip_code) {
    cy.get("h4:nth-of-type(3)").click();
    cy.get("input[name='street'").type(street);
    cy.get("input[name='city'").type(city);
    cy.get("input[name='state'").type(state);
    cy.get("input[name='zip_code'").click().clear().click().type(zip_code);
    cy.get(
      "div[name='country'] > div[role='combobox'] > .ag-flex.ag-space-between > .ag-align-center.ag-flex.ag-select-wrap"
    ).dblclick({
      force: true,
    });
    cy.get(".ag-select-list-wrapper li").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.wrap($el)
        .eq(random)
        .as("name")
        .invoke("text")
        .then((name) => {
          cy.get("@name").click();
          currentCountry = name.trim();
        });
    });

    return this;
  }

  typePreferedData(date) {
    cy.get("form[name='clientForm'] > h4:nth-of-type(4)").click();
    cy.get("#preferredIntake").type(date);

    return this;
  }

  typePassportNumber(passportNumber) {
    cy.get("input[name='passport_number']").type(passportNumber);

    return this;
  }

  typeVisaType(visaType) {
    cy.get("input[name='visa_type']").click().clear().click().type(visaType);

    return this;
  }

  typeVisaExpiry(date) {
    cy.get("#visaExpiry").type(date);

    return this;
  }

  selectFollowers() {
    cy.get("div[name='followers'] > div[role='combobox']").dblclick();
    cy.get(".ag-select-element").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.wrap($el)
        .eq(random)
        .as("followers")
        .invoke("text")
        .then((name) => {
          cy.get("@followers").click({
            force: true,
          });
          followers = name.trim().replace(/\((.*?)\)/g, "");
        });
    });

    return this;
  }

  selectSource() {
    cy.get("div[name='source'] > div[role='combobox']").dblclick({
      force: true,
    });
    cy.get(".ag-select-element").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.wrap($el)
        .eq(random)
        .as("source")
        .invoke("text")
        .then((name) => {
          cy.get("@source").click();
          sources = name;
        });
    });

    return this;
  }

  selectTagName() {
    cy.get("div[name='tags'] > div[role='combobox'] .ag-select-icon").dblclick({
      force: true,
    });
    cy.wait(3000);
    cy.get(".ag-select-element").then(($el) => {
      const random = Math.floor(Math.random() * $el.length);
      cy.wrap($el)
        .eq(random)
        .as("tagName")
        .invoke("text")
        .then((name) => {
          cy.get("@tagName").click();
          cy.get(
            "div[name='tags'] > div[role='combobox'] .ag-select-icon"
          ).click({
            force: true,
          });
          tagName = name.trim();
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
    cy.get("tr:nth-of-type(1) > td:nth-of-type(12)").should(
      assertValue,
      assignee
    );

    return this;
  }

  verifyCountryOfPassport(assertValue = "include.text") {
    cy.get("td:nth-of-type(11)> span >p")
      .first()
      .should(assertValue, countryOfPassport);

    return this;
  }

  verifyFollowers(assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(13) .ag-flex").should(
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
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(8)").should(
      assertValue,
      phone
    );

    return this;
  }

  verifyCurrentCity(city, assertValue = "include.text") {
    cy.get("td:nth-of-type(11) > span").first().should(assertValue, city);

    return this;
  }

  verifyCurrentCountry(assertValue = "include.text") {
    cy.get("td:nth-of-type(11)> span >p")
      .first()
      .should(assertValue, currentCountry);

    return this;
  }

  verifyPassportNumber(passportNumber, assertValue = "include.text") {
    cy.get("tbody tr:nth-of-type(1) td:nth-of-type(10)").should(
      assertValue,
      passportNumber
    );

    return this;
  }
}

export default Client;
