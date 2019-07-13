const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/utils/app.js");
const Blog = require("../src/models/blog.js");
const helper= require("../src/utils/blogTestHelper.js");

const api = supertest(app);

beforeEach(async () => {
  await helper.initDb();
});

describe("GET tests", () => {
  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body.length).toBe(helper.initialNumOfBlogs());
  });

  test("id field should be set", async () => {
    const res = await api.get("/api/blogs");

    res.body.map(blog => blog.id).forEach(b => expect(b).toBeDefined());
  });
});

describe("POST tests", () => {
  const validTestBlogLiked = {
    title: "Testaaja",
    author: "Tauno Testaaja",
    url: "testi.com",
    likes: 1
  };

  test("a valid blog is added", async () => {
    const res = await api
      .post('/api/blogs')
      .send(validTestBlogLiked)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialNumOfBlogs() + 1);

    const blogsWithoutId = blogsAtEnd.map(blog => {
      delete blog.id;
      return blog;
    });

    expect(blogsWithoutId).toContainEqual(validTestBlogLiked);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
