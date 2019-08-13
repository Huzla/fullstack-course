import React from "react";
import Blog from "../Blog.js";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";

describe("<Blog />", () => {
  let component;
  const info = {
    blog: {
      title: "This is a test",
      author: "Teppo Testaaja",
      url: "testi.com",
      likes: 12,
      user: {
        name: "Teppo Testaaja",
        userId: "Teppo123"
      }
    },
    handleLike: jest.fn(),
    handleRemove: jest.fn(),
    removable: true
  };

  beforeEach(() => {
    component = render(
      <Blog { ...info }/>
    );
  });

  test("renders the component", () => {
    const div = component.container.querySelector(".blog-item");

    expect(div).toBeDefined();
  });

  test("initially displays minimized component", () => {
    const largeDiv = component.container.querySelector(".blog-item-container");
    expect(largeDiv).toBeNull();

    const minimizedDiv = component.container.querySelector(".blog-item");
    expect(minimizedDiv).not.toBeNull();
  });

  test("displays correct information in minimized component", () => {
    const div = component.container.querySelector(".blog-item");

    expect(div).toContainHTML(`<strong>${ info.blog.title }</strong> <em>${ info.blog.author }</em>`)
  });

  test("clicking minimized item displays maximized item", () => {
    const minimizedDiv = component.container.querySelector(".blog-item");
    fireEvent.click(minimizedDiv);

    const maximizedContainer = component.container.querySelector(".blog-item-container");
    const maximizedDiv = component.container.querySelector(".blog-item");

    expect(maximizedContainer).not.toBeNull();
    expect(maximizedDiv).not.toBeNull();
  });

  test("maximized item displays correct information", () => {
    const minimizedDiv = component.container.querySelector(".blog-item");
    fireEvent.click(minimizedDiv);

    const maximizedDiv = component.container.querySelector(".blog-item-container");

    expect(maximizedDiv).toContainHTML(`<strong>${ info.blog.title }</strong>`);
    expect(maximizedDiv).toContainHTML(`<em>${ info.blog.author }</em>`);
    expect(maximizedDiv).toContainHTML(`<a href="${ info.blog.url }">${ info.blog.url }</a>`);
    expect(maximizedDiv).toContainHTML(`<span>${ info.blog.likes }</span>`);
    expect(maximizedDiv).toContainHTML(`<div>added by <em>${ info.blog.user.name }</em></div>`);

  });
});
