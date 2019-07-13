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
});

afterAll(() => {
  mongoose.connection.close();
});
