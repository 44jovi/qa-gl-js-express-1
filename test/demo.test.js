const { expect } = require("chai");

const { isPrimeNum } = require("../demo-for-tests");

describe("demo test suite", () => {
  it("1 + 1 should equal 2", () => {
    expect(1 + 1).to.equal(2);
  });
});

describe("prime number checker", () => {
  it("1 should equal false", () => {
    expect(isPrimeNum(8)).to.equal(false);
  });

  it("8 should equal false", () => {
    expect(isPrimeNum(8)).to.equal(false);
  });

  it("43 should equal true", () => {
    expect(isPrimeNum(43)).to.equal(true);
  });

  it("1000 should equal false", () => {
    expect(isPrimeNum(1000)).to.equal(false);
  });
});
