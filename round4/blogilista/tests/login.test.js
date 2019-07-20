const { User } = require("../src/models");
const { TOKEN_SECRET } = require("../src/utils/config.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/utils/app.js");
const helper= require("../src/utils/userTestHelper.js");
const jwt = require("jsonwebtoken");

const api = supertest(app);

beforeEach(async () => {
  await helper.initDb();
});

describe("POST tests", () => {

  const validUser = helper.testUsers[0];

  test("invalid userid produces unauthorized", async () => {
    const invalidUser = { ...validUser };
    invalidUser.userId = "wrong123";

    const res = await api
      .post('/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("Incorrect userid or password")
  });

  test("invalid password produces unauthorized", async () => {
    const invalidUser = { ...validUser };
    invalidUser.password = "wrong password";

    const res = await api
      .post('/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(res.body.message).toBe("Incorrect userid or password")
  });

  test("correct credetials produce login information with a valid token", async () => {

    const res = await api
      .post('/login')
      .send(validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    let result = '';

    try {
      result = jwt.verify(res.body.token, TOKEN_SECRET);
      result = result.userId === validUser.userId;
    }
    catch (err) {
      result = false;
    }

    expect(result).toBeTruthy();
  });

});

afterAll(() => {
  mongoose.connection.close();
});
