import { dataCy } from "../support/util";

describe("Queue Workflow", () => {
  (["macbook-15", "ipad-2", "iphone-x"] as const).forEach((viewport) => {
    it(`Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.visit("/");

      cy.get("main").within(() => {
        cy.contains("Queue").click();
      });

      cy.url().should("include", "/queue");

      cy.get(dataCy`queue-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      cy.get(dataCy`queue-method-dequeue-button`).should("be.disabled");

      cy.get(dataCy`queue-method-enqueue-button`).should("be.disabled");
      cy.get(dataCy`queue-method-enqueue-input`).type("10");
      cy.get(dataCy`queue-method-enqueue-button`)
        .should("not.be.disabled")
        .click();

      cy.get(dataCy`queue-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`queue-method-dequeue-button`).should("not.be.disabled");

      cy.get(dataCy`queue-method-enqueue-input`)
        .clear()
        .type("20");
      cy.get(dataCy`queue-method-enqueue-button`).click();

      cy.get(dataCy`queue-property-size`)
        .should("contain", "Size")
        .should("contain", "2");

      cy.get(dataCy`queue-method-dequeue-button`).click();
      cy.get(dataCy`queue-method-dequeue-result`).should(
        "contain",
        "Dequeued: 10",
      );

      cy.get(dataCy`queue-property-size`)
        .should("contain", "Size")
        .should("contain", "1");

      cy.get(dataCy`queue-method-dequeue-button`).click();
      cy.get(dataCy`queue-method-dequeue-result`).should(
        "contain",
        "Dequeued: 20",
      );

      cy.get(dataCy`queue-property-size`)
        .should("contain", "Size")
        .should("contain", "0");

      for (let i = 1; i <= 16; i++) {
        cy.get(dataCy`queue-method-enqueue-input`)
          .clear()
          .type((i * 10).toString());
        cy.get(dataCy`queue-method-enqueue-button`).click();
      }

      cy.get(dataCy`queue-property-size`)
        .should("contain", "Size")
        .should("contain", "16");

      cy.get(dataCy`queue-method-enqueue-input`).should("be.disabled");
      cy.get(dataCy`queue-method-enqueue-button`).should("be.disabled");
    });
  });
});
