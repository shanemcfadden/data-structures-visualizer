describe("linked list", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get("main").within(() => {
      cy.contains("Linked List").click();
    });

    cy.url().should("include", "/linked-list");

    cy.get('[data-cy="linked-list-property-head"]')
      .should("contain", "Head")
      .should("contain", "null");
    cy.get('[data-cy="linked-list-property-tail"]')
      .should("contain", "Tail")
      .should("contain", "null");
    cy.get('[data-cy="linked-list-property-length"]')
      .should("contain", "Length")
      .should("contain", "0");
  });
});

