const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/utils/app.js");
const { Blog, User } = require("../src/models");
const helper= require("../src/utils/userTestHelper.js");
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeEach(async () => {
  await helper.initDb();
});

describe("GET tests", () => {
  test("all user are returned", async () => {
    const res = await api.get("/api/users");

    expect(res.body.length).toBe(helper.initialNumOfUsers());
  });

  test("password should be correct", async () => {
    const res = await api.get("/api/users");
    const hashAndPass = res.body.map(user => { return { hash: user.pass, password: helper.testUsers.find(tu => tu.userId === user.userId).pass } });
    hashAndPass.forEach(async ({ hash, password }) => expect(await bcrypt.compare(password, hash)).toBeTruthy());
  });
});

describe("POST tests", () => {
  beforeEach(async () => {
    await helper.initDb();
  });

  const validUser = {
    name: "Tom the Tester",
    userId: "Tom123",
    password: "secret"
  };

  test("a valid user is added", async () => {
    const res = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(helper.initialNumOfUsers() + 1);
  });

  test("a valid user's password is hashed", async () => {
    const res = await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    console.log("TEST", usersAtEnd);

    const validUserInDb = usersAtEnd.find(user => user.userId === validUser.userId);

    console.log("TEST", validUserInDb);

    expect(validUserInDb).toBeDefined();
    expect(await bcrypt.compare(validUser.password, validUserInDb.pass)).toBeTruthy();

  });
});

afterAll(() => {
  mongoose.connection.close();
});
