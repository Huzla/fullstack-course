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

      it("after a valid submission, form fields are cleared", function() {

        cy.get("[data-test-input='title']")
          .type("Testaukseni");

        cy.get("[data-test-input='author']")
          .type("joku");

        cy.get("[data-test-input='url']")
          .type("http://testi.com");

        cy.get("[data-test-button='blog-form-submit']")
          .click();

        cy.get("[data-test-input='title']")
          .should("be.empty");

        cy.get("[data-test-input='author']")
          .should("be.empty");

        cy.get("[data-test-input='url']")
          .should("be.empty");
      });

    });
  });

  describe("Blog list", function() {
    beforeEach(function() {
      cy.get("[data-test-button='blog-form-toggler']")
        .click();

      cy.get("[data-test-input='title']")
        .type("Testaukseni");

      cy.get("[data-test-input='author']")
        .type("joku");

      cy.get("[data-test-input='url']")
        .type("http://testi.com");

      cy.get("[data-test-button='blog-form-submit']")
        .click();

      cy.get("[data-test-input='title']")
        .type("Testaajan käsikirja");

      cy.get("[data-test-input='author']")
        .type("joku");

      cy.get("[data-test-input='url']")
        .type("http://testi.com");

      cy.get("[data-test-button='blog-form-submit']")
        .click();

      cy.get("[data-test-input='title']")
        .type("Testauksesta");

      cy.get("[data-test-input='author']")
        .type("joku");

      cy.get("[data-test-input='url']")
        .type("http://testi.com");

      cy.get("[data-test-button='blog-form-submit']")
        .click();
    });

    it("list should contain three added items", function() {
      cy.get("[data-test-list='blog-list']")
        .find("[data-test-item='blog']")
        .should("have.length", 3);
    });

    describe("Pagination", function() {
      beforeEach(function() {
        const addBlog = function() {
          cy.get("[data-test-input='title']")
            .type("Testaukseni");

          cy.get("[data-test-input='author']")
            .type("joku");

          cy.get("[data-test-input='url']")
            .type("http://testi.com");

          cy.get("[data-test-button='blog-form-submit']")
            .click();
        };

        Array(10).fill(0).map(addBlog);
      });

      it("list with more than 10 items should be paginated", function() {
        cy.get("[data-test-list='blog-list']")
          .find("[data-test-item='blog']")
          .should("have.length", 10);
      });

      it("paginated list should have multiple pages", function() {
        cy.get("[aria-label='Next item']")
          .click()

        cy.get("[data-test-list='blog-list']")
          .find("[data-test-item='blog']")
          .should("have.length", 3);
      });

    });

    describe("Blog", function() {
      it("clicking on blog should show a blog page", function() {
        cy.get("[data-test-link='blog']:first")
          .click();

        cy.contains("Blog Page");
      });

      describe("Blog page", function() {
        beforeEach(function() {
          cy.get("[data-test-link='blog']:first")
            .click();
        });

        it("user should be able to like a blog", function() {
          cy.get("[data-test-label='likes']")
            .contains("0");

          cy.get("[data-test-button='like']")
            .click();

          cy.get("[data-test-label='likes']")
            .contains("1");
        });

        it("user should be able to like a blog", function() {
          const testInput = "Tama on testi";

          cy.get("[data-test-input='comment']")
            .type(testInput);

          cy.get("[data-test-button='comment']")
            .click();

          cy.get("[data-test-list='comments']")
            .contains(testInput);
        });
      })
    });
  });
});
