const chai = require("chai");
// Chai HTTP plugin
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../index");
const { catModel } = require("../db");

const mongoose = require("mongoose");

// before(() => {
//   mongoose.connection.db.dropDatabase();
// });

beforeEach(async () => {
  await catModel.deleteMany({});
  testCat = await catModel.create({
    name: "test cat!",
    colour: "orange",
    evil: true,
  });
  testCat = JSON.stringify(testCat);
  testCat = JSON.parse(testCat);
});

describe("API tests", () => {
  it("/create should create a cat", (done) => {
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

  it("/getAll should get all cats", (done) => {
    chai
      .request(server)
      .get("/cats/getAll")
      .send()
      .end((err, res) => {
        chai.expect(err).to.be.null;
        console.log(res.body[0]);
        chai.expect(res.body[0]._id).to.equal(testCat._id);
        // Confirm it was the last cat created
        chai.expect(res.body[res.body.length - 1].name).to.equal("test cat!");
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
