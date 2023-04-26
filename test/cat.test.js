const chai = require("chai");
// Chai HTTP plugin
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../index");

const mongoose = require("mongoose");

before(() => {
  mongoose.connection.db.dropDatabase();
});

describe("API tests", () => {
  it("should create a cat", (done) => {
    const cat = { name: "whiskerz", colour: "blue", evil: true };

    chai
      .request(server)
      .post("/cats/create")
      .send(cat)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.include(cat);
        chai.expect(res.status).to.equal(201);
        // End of test
        done();
      });
  });

  it("should get all cats", (done) => {
    chai
      .request(server)
      .get("/cats/getAll")
      .send()
      .end((err, res) => {
        chai.expect(err).to.be.null;
        console.log(res.body);
        // Point to last cat created
        chai.expect(res.body[res.body.length - 1].name).to.equal("whiskerz");
        // TODO: check cat id
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
