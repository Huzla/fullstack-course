import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "../SimpleBlog.js";

describe("<SimpleBlog />", () => {
  let component;
  const info = {
    blog: {
      title: "This is a test",
      author: "Teppo Testaaja",
      likes: "12"
    },
    onClick: jest.fn()
  };

  beforeEach(() => {
    component = render(
      <SimpleBlog { ...info }/>
    );
  });

  test("renders the component", () => {
    component.container.querySelector(".blog-item");
  });

  test("displays title and author with correct content", () => {
    component.getByText(`${ info.blog.title } ${ info.blog.author }`);
  });

  test("displays likes with correct content", () => {
    component.getByText(`blog has ${ info.blog.likes } likes`);
  });

  test("two like button clicks result in two handler calls", () => {
    const button = component.container.querySelector(".like-button");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(info.onClick.mock.calls.length).toBe(2);
  });

});
