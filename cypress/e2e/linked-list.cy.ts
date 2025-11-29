import { dataCy } from "../support/util";

describe("Linked List Workflow", () => {
  (["macbook-15", "ipad-2", "iphone-x"] as const).forEach((viewport) => {
    it(`Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.visit("/");

      cy.get("main").within(() => {
        cy.contains("Linked List").click();
      });

      cy.url().should("include", "/linked-list");

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "null");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "null");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "0");

      cy.get(dataCy`linked-list-method-remove-first-button`).should(
        "be.disabled",
      );
      cy.get(dataCy`linked-list-method-remove-last-button`).should(
        "be.disabled",
      );

      cy.get(dataCy`linked-list-method-append-button`).should("be.disabled");
      cy.get(dataCy`linked-list-method-append-input`).type("10");
      cy.get(dataCy`linked-list-method-append-button`)
        .should("not.be.disabled")
        .click();

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "10");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "10");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "1");

      cy.get(dataCy`linked-list-method-remove-first-button`).should(
        "not.be.disabled",
      );
      cy.get(dataCy`linked-list-method-remove-last-button`).should(
        "not.be.disabled",
      );

      cy.get(dataCy`linked-list-method-append-input`)
        .clear()
        .type("20");
      cy.get(dataCy`linked-list-method-append-button`).click();

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "10");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "20");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "2");

      cy.get(dataCy`linked-list-method-prepend-input`)
        .clear()
        .type("5");
      cy.get(dataCy`linked-list-method-prepend-button`).click();

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "5");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "20");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "3");

      cy.get(dataCy`linked-list-method-remove-first-button`).click();
      cy.get(dataCy`linked-list-method-remove-first-result`).should(
        "contain",
        "Removed: 5",
      );

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "10");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "20");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "2");

      cy.get(dataCy`linked-list-method-remove-last-button`).click();
      cy.get(dataCy`linked-list-method-remove-last-result`).should(
        "contain",
        "Removed: 20",
      );

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "10");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "10");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "1");

      cy.get(dataCy`linked-list-method-remove-first-button`).click();
      cy.get(dataCy`linked-list-method-remove-first-result`).should(
        "contain",
        "Removed: 10",
      );

      cy.get(dataCy`linked-list-property-head`)
        .should("contain", "Head")
        .should("contain", "null");
      cy.get(dataCy`linked-list-property-tail`)
        .should("contain", "Tail")
        .should("contain", "null");
      cy.get(dataCy`linked-list-property-length`)
        .should("contain", "Length")
        .should("contain", "0");

      for (let i = 1; i <= 20; i++) {
        cy.get(dataCy`linked-list-method-append-input`)
          .clear()
          .type((i * 10).toString());
        cy.get(dataCy`linked-list-method-append-button`).click();
      }

      cy.get(dataCy`linked-list-method-append-input`).should("be.disabled");
      cy.get(dataCy`linked-list-method-append-button`).should("be.disabled");

      cy.get(dataCy`linked-list-method-prepend-input`).should("be.disabled");
      cy.get(dataCy`linked-list-method-prepend-button`).should("be.disabled");
    });
  });
});
