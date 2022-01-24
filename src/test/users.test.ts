import { expect } from "chai";
import supertest from "supertest";

import mongooseService from "../services/mongoose.service";
import server from "../app";

describe("Users test", () => {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(server);
  });

  it("Create user - success", async () => {
    const userName = "TEST USER";
    const res = await request.post("/api/users").send({ name: userName });
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.name).to.be.a("string");
    expect(res.body.name).to.be.equal(userName);
  });

  it("Get all users - test if created user exists", async () => {
    // create user
    const userName = "TEST USER";
    const createRes = await request.post("/api/users").send({ name: userName });

    const res = await request.get("/api/users").send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    const userIds = res.body.map((user) => user._id);
    expect(userIds).contain(createRes.body._id);
  });

  it("Get one users - invalid object id", async () => {
    // create user
    const res = await request.get("/api/users/1234").send();
    expect(res.status).to.equal(400);
    expect(res.body).not.to.be.empty;
    expect(res.body.error).to.equal("Invalid id for user.");
  });

  after((done) => {
    server.close(() => {
      console.log("Closing services....");
      mongooseService.close();
      done();
    });
  });
});
