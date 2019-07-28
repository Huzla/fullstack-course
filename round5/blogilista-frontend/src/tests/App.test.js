import React from "react";
import { render,  waitForElement } from "@testing-library/react";
jest.mock("../services/blogs.js");
import App from "../App.js";


describe("<App />", () => {

  test("if no user logged, notes are not rendered", async () => {
    const component = render(
      <App />
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText("login")
    );

    expect(component.container).toHaveTextContent(
      "Please login"
    );

    const blogItem = component.container.querySelector(".blog-item");

    expect(blogItem).toBeNull();
  });

  test("logged in user can see the blogs", async () => {
    const user = {
      userId: "Teppo123",
      token: "1231231214",
      name: "Teppo Testaaja"
    };

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

    const component = render(
      <App />
    );
    component.rerender(<App />);
    
    await waitForElement(
      () => component.getByText("Blogs")
    );

    const notes = component.container.querySelectorAll(".blog-item");
    expect(notes.length).toBe(3);
  });
});
