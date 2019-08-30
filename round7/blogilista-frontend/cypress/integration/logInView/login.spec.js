describe("Log in page", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Teppo Testaaja",
      userId: "Teppo123",
      password: "salasana"
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("log in page can be opened", function() {
    cy.contains("Please login");
  });

  it("log in page contains fields for entering user credentials", function() {
    //Expected username and password
    cy.get("[data-test-input='username']")
      .should("exist");

      cy.get("[data-test-input='password']")
        .should("exist");
  });

  it("users can login", function() {
    //Expected username and password
    cy.get("[data-test-input='username']")
      .type("Teppo123");

      cy.get("[data-test-input='password']")
        .type("salasana");

      cy.get("[data-test-button='login']")
        .click();

      cy.contains("Logged in as:");
  });

  it("users can log out", function() {
    //Expected username and password
    cy.get("[data-test-input='username']")
      .type("Teppo123");

      cy.get("[data-test-input='password']")
        .type("salasana");

      cy.get("[data-test-button='login']")
        .click();

      cy.contains("Logout")
        .click();

      cy.contains("Please login");
  });
});
