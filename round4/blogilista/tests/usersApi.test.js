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

    expect(res.body.length).toBe(helper.initialNumOfUsers);
  });

  test("password should be hashed", async () => {
    const res = await api.get("/api/users");
    const hashAndPass = res.body.map(user => { hash: user.pass, password: helper.testUsers.find(tu => tu.userId === user.userId).pass });
    hashAndPass.forEach(async { hash, password } => expect(await bcrypt.compare(body.password, user.passwordHash)).toBeTruthy());
  });
});
