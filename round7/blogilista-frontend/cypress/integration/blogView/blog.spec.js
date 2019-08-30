describe("Blog View", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Teppo Testaaja",
      userId: "Teppo123",
      password: "salasana"
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");

    cy.get("[data-test-input='username']")
      .type("Teppo123");

    cy.get("[data-test-input='password']")
      .type("salasana");

    cy.get("[data-test-button='login']")
      .click();

  });

  describe("Blog form", function() {

    it("blog form can be toggled", function() {

      const notVisible = function() {
        cy.get("[data-test-input='title']")
          .should("not.be.visible");

        cy.get("[data-test-input='author']")
          .should("not.be.visible");

        cy.get("[data-test-input='url']")
          .should("not.be.visible");
      };

      const visible = function() {
        cy.get("[data-test-input='title']")
          .should("be.visible");

        cy.get("[data-test-input='author']")
          .should("be.visible");

        cy.get("[data-test-input='url']")
          .should("be.visible");
      };

      notVisible();

      cy.get("[data-test-button='blog-form-toggler']")
        .click();

      visible();

      cy.get("[data-test-button='blog-form-toggler']")
        .click();

      notVisible();
    });

    describe("Creating a blog", function() {
      beforeEach(function() {
        cy.get("[data-test-button='blog-form-toggler']")
        .click();
      });

      it("a new blog with no info can't be created", function() {
        cy.get("[data-test-button='blog-form-submit']")
        .click();

        cy.get("[data-test-notification='error']")
        .should("exist");
      });

      it("a new blog with no title can't be created", function() {
        cy.get("[data-test-input='author']")
          .type("joku");

        cy.get("[data-test-input='url']")
          .type("http://testi.com");

        cy.get("[data-test-button='blog-form-submit']")
          .click();

        cy.get("[data-test-notification='error']")
          .should("exist");
      });

      it("A valid blog is created", function() {

        cy.get("[data-test-input='title']")
          .type("Testaukseni");

        cy.get("[data-test-input='author']")
          .type("joku");

        cy.get("[data-test-input='url']")
          .type("http://testi.com");

        cy.get("[data-test-button='blog-form-submit']")
          .click();

        cy.get("[data-test-list='blog-list']")
          .contains("Testaukseni");
      });

    });
  });
});
