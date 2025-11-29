import { dataCy } from "../support/util";

describe("Binary Heap Workflow", () => {
  (["macbook-15", "ipad-2", "iphone-x"] as const).forEach((viewport) => {
    it(`Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.visit("/");

      cy.get("main").within(() => {
        cy.contains("Binary Heap").click();
      });

      cy.url().should("include", "/binary-heap");

      cy.get(dataCy`binary-heap-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      cy.get(dataCy`binary-heap-method-extract-button`).should("be.disabled");

      cy.get(dataCy`binary-heap-method-insert-button`).should("be.disabled");
      cy.get(dataCy`binary-heap-method-insert-input`).type("10");
      cy.get(dataCy`binary-heap-method-insert-button`)
        .should("not.be.disabled")
        .click();

      cy.get(dataCy`binary-heap-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`binary-heap-method-extract-button`).should(
        "not.be.disabled",
      );

      cy.get(dataCy`binary-heap-method-insert-input`)
        .clear()
        .type("20");
      cy.get(dataCy`binary-heap-method-insert-button`).click();

      cy.get(dataCy`binary-heap-property-size`)
        .should("contain", "Size")
        .should("contain", "2");

      cy.get(dataCy`binary-heap-method-extract-button`).click();
      cy.get(dataCy`binary-heap-method-extract-result`).should(
        "contain",
        "Extracted: 10",
      );

      cy.get(dataCy`binary-heap-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`binary-heap-method-extract-button`).click();
      cy.get(dataCy`binary-heap-method-extract-result`).should(
        "contain",
        "Extracted: 20",
      );

      cy.get(dataCy`binary-heap-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      for (let i = 1; i <= 31; i++) {
        cy.get(dataCy`binary-heap-method-insert-input`)
          .clear()
          .type((i * 10).toString());
        cy.get(dataCy`binary-heap-method-insert-button`).click();
      }

      cy.get(dataCy`binary-heap-property-size`)
        .should("contain", "Size")
        .should("contain", "31");

      cy.get(dataCy`binary-heap-method-insert-input`).should("be.disabled");
      cy.get(dataCy`binary-heap-method-insert-button`).should("be.disabled");
    });
  });
});
