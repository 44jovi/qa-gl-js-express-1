/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const { describe, beforeEach, it } = require('mocha');
// const { beforeEach } = require('chai');
// const { it } = require('chai');

// Chai HTTP plugin
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const mongoose = require('mongoose');
const server = require('../index');
const { catModel } = require('../db');

// before(() => {
//   mongoose.connection.db.dropDatabase();
// });

describe('API tests', () => {
  beforeEach(async () => {
    await catModel.deleteMany({});
    testCat = await catModel.create({
      name: 'test cat!',
      colour: 'orange',
      evil: true,
    });
    // testCat = JSON.stringify(testCat);
    // testCat = JSON.parse(testCat);

    // eslint-disable-next-line no-unused-vars
    testCat = JSON.parse(JSON.stringify(testCat));
  });

  it('/create should create a cat', (done) => {
    const cat = { name: 'whiskerz', colour: 'blue', evil: true };

    chai
      .request(server)
      .post('/cats/create')
      .send(cat)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.include(cat);
        chai.expect(res.status).to.equal(201);
        // End of test
        done();
      });
  });

  it('/getAll should get all cats', (done) => {
    chai
      .request(server)
      .get('/cats/getAll')
      .send()
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body[0]._id).to.equal(testCat._id);
        // Confirm it was the last cat created
        chai.expect(res.body[res.body.length - 1].name).to.equal('test cat!');
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it('/remove deletes a cat', (done) => {
    chai
      .request(server)
      .delete(`/cats/remove/${testCat._id}`)
      .send()
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body.acknowledged).to.equal(true);
        chai.expect(res.body.deletedCount).to.equal(1);
        chai.expect(res.status).to.equal(201);
      });

    chai
      .request(server)
      .get('/cats/getAll')
      .send()
      .end((err, res) => {
        chai.expect(err).to.be.null;
        // `eql` is the same as to.deep.equal:
        chai.expect(res.body).to.eql([]);
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it('/update udpates a cat', (done) => {
    const updatedCat = {
      name: 'potato',
      colour: 'brown',
      evil: false,
    };

    chai
      .request(server)
      .patch(`/cats/update/${testCat._id}`)
      .query(updatedCat)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai
          .expect(res.body)
          .to.deep.equal({ _id: testCat._id, __v: testCat.__v, ...updatedCat });
        chai.expect(res.status).to.equal(201);
        done();
      });
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
