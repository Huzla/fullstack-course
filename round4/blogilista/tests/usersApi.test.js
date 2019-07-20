const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/utils/app.js");
const { Blog, User } = require("../src/models");
const { PASS_LENGTH, USERID_LENGTH } = require("../src/utils/config.js");
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

  test("invalid user with no userId is not added", async () => {
    const invalidUser = { ...validUser };
    delete invalidUser.userId;

    const res = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("user id should be at least 3 characters long")
  });

  test("invalid user with no password is not added", async () => {
    const invalidUser = { ...validUser };
    delete invalidUser.password;

    const res = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("password should be at least 3 characters long")
  });

  test("invalid user with too short password is not added", async () => {
    const invalidUser = { ...validUser };
    invalidUser.password = "a".repeat(PASS_LENGTH - 1);

    const res = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("password should be at least 3 characters long")
  });

  test("invalid user with too short userId is not added", async () => {
    const invalidUser = { ...validUser };
    invalidUser.userId = "a".repeat(USERID_LENGTH - 1);

    const res = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("user id should be at least 3 characters long")
  });

  test("invalid user with duplicate userId is not added", async () => {
    const invalidUser = { ...validUser };
    invalidUser.userId = helper.testUsers[0].userId;

    const res = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("Error, expected `userId` to be unique. Value: `Teppo123`")
  });

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

    const validUserInDb = usersAtEnd.find(user => user.userId === validUser.userId);

    expect(validUserInDb).toBeDefined();
    expect(await bcrypt.compare(validUser.password, validUserInDb.password)).toBeTruthy();

  });
});

afterAll(() => {
  mongoose.connection.close();
});
