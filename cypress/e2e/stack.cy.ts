import { dataCy } from "../support/util";

describe("Stack Workflow", () => {
  (["macbook-15", "ipad-2", "iphone-x"] as const).forEach((viewport) => {
    it(`Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.visit("/");

      cy.get("main").within(() => {
        cy.contains("Stack").click();
      });

      cy.url().should("include", "/stack");

      cy.get(dataCy`stack-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      cy.get(dataCy`stack-method-pop-button`).should("be.disabled");

      cy.get(dataCy`stack-method-push-input`).type("10");
      cy.get(dataCy`stack-method-push-button`).click();

      cy.get(dataCy`stack-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`stack-method-pop-button`).should("not.be.disabled");

      cy.get(dataCy`stack-method-push-input`)
        .clear()
        .type("20");
      cy.get(dataCy`stack-method-push-button`).click();

      cy.get(dataCy`stack-property-size`)
        .should("contain", "Size")
        .should("contain", "2");

      cy.get(dataCy`stack-method-pop-button`).click();
      cy.get(dataCy`stack-method-pop-result`).should("contain", "Popped: 20");

      cy.get(dataCy`stack-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`stack-method-pop-button`).click();
      cy.get(dataCy`stack-method-pop-result`).should("contain", "Popped: 10");

      cy.get(dataCy`stack-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      for (let i = 1; i <= 10; i++) {
        cy.get(dataCy`stack-method-push-input`)
          .clear()
          .type((i * 10).toString());
        cy.get(dataCy`stack-method-push-button`).click();
      }

      cy.get(dataCy`stack-property-size`)
        .should("contain", "Size")
        .should("contain", "10");

      cy.get(dataCy`stack-method-push-input`).should("be.disabled");
      cy.get(dataCy`stack-method-push-button`).should("be.disabled");
    });
  });
});
