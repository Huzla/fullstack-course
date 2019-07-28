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

/*
  test("two like button clicks result in two handler calls", () => {
    const button = component.container.querySelector(".like-button");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(info.onClick.mock.calls.length).toBe(2);
  });
*/
});
