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

  const validTestBlogNoLikes = {
    title: "Testauksen alkeet",
    author: "Tiina Testaaja",
    url: "testi.com"
  };

  const invalidTestBlogWithoutUrl = {
    title: "Testauksen alkeet",
    author: "Tiina Testaaja"
  };

  const invalidTestBlogWithoutTitle = {
    author: "Tiina Testaaja",
    url: "testi.com"
  };

  test("a valid blog with likes is added", async () => {
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

  test("a valid blog without likes is added and likes is set to 0", async () => {
    const res = await api
      .post('/api/blogs')
      .send(validTestBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialNumOfBlogs() + 1);

    const blogsWithoutId = blogsAtEnd.map(blog => {
      delete blog.id;
      return blog;
    });

    expect(blogsWithoutId).toContainEqual({ ...validTestBlogNoLikes, likes: 0 });
  });

  test("a blog without a url is a bad request", async () => {
    const res = await api
      .post('/api/blogs')
      .send(invalidTestBlogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("Path `url` is required.");
  });

  test("a blog without a title is a bad request", async () => {
    const res = await api
      .post('/api/blogs')
      .send(invalidTestBlogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("Path `title` is required.");
  });

});

describe("DELETE tests", () => {
  test("Invalid id returns 400", async () => {
    const res = await api
      .delete('/api/blogs/TESTIID')
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test("Successful removal returns 204", async () => {
    const id = (await helper.blogsInDb())[0].id;

    const res = await api
      .delete(`/api/blogs/${ id }`)
      .expect(204);
  });

  test("Successful removal removes resource", async () => {
    const blog = (await helper.blogsInDb())[0];

    const res = await api
      .delete(`/api/blogs/${ blog.id }`)
      .expect(204);

    expect(await helper.blogsInDb()).not.toContainEqual({ blog });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
