const chai = require("chai");
// Chai HTTP plugin
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../index");

describe("API tests", () => {
  it("should create a cat", (done) => {
    const cat = { name: "blah", colour: "blue", evil: true };

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
});
