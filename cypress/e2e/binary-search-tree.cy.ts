import { dataCy } from "../support/util";

describe("Binary Search Tree Workflow", () => {
  (["macbook-15", "ipad-2", "iphone-x"] as const).forEach((viewport) => {
    it(`Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.visit("/");

      cy.get("main").within(() => {
        cy.contains("Binary Search Tree").click();
      });

      cy.url().should("include", "/binary-search-tree");

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      cy.get(dataCy`binary-search-tree-method-delete-button`).should(
        "be.disabled",
      );

      cy.get(dataCy`binary-search-tree-method-insert-button`).should(
        "be.disabled",
      );
      cy.get(dataCy`binary-search-tree-method-insert-input`).type("10");
      cy.get(dataCy`binary-search-tree-method-insert-button`)
        .should("not.be.disabled")
        .click();

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`binary-search-tree-method-delete-button`).should(
        "be.disabled",
      );

      cy.get(dataCy`binary-search-tree-method-insert-input`)
        .clear()
        .type("20");
      cy.get(dataCy`binary-search-tree-method-insert-button`).click();

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "2");

      cy.get(dataCy`binary-search-tree-method-delete-input`)
        .clear()
        .type("20");
      cy.get(dataCy`binary-search-tree-method-delete-button`).click();
      cy.get(dataCy`binary-search-tree-method-delete-result`).should(
        "contain",
        "Deleted: true",
      );

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`binary-search-tree-method-delete-input`)
        .clear()
        .type("20");
      cy.get(dataCy`binary-search-tree-method-delete-button`).click();
      cy.get(dataCy`binary-search-tree-method-delete-result`).should(
        "contain",
        "Deleted: false",
      );

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`binary-search-tree-method-delete-input`)
        .clear()
        .type("10");
      cy.get(dataCy`binary-search-tree-method-delete-button`).click();
      cy.get(dataCy`binary-search-tree-method-delete-result`).should(
        "contain",
        "Deleted: true",
      );

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "0");
      cy.get(dataCy`binary-search-tree-method-delete-input`).should(
        "be.disabled",
      );

      for (let i = 1; i <= 31; i++) {
        cy.get(dataCy`binary-search-tree-method-insert-input`)
          .clear()
          .type((i * 10).toString());
        cy.get(dataCy`binary-search-tree-method-insert-button`).click();
      }

      cy.get(dataCy`binary-search-tree-property-size`)
        .should("contain", "Size")
        .should("contain", "31");

      cy.get(dataCy`binary-search-tree-method-insert-input`).should(
        "be.disabled",
      );
      cy.get(dataCy`binary-search-tree-method-insert-button`).should(
        "be.disabled",
      );
    });
  });
});
