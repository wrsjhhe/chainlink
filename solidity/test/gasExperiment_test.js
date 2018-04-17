'use strict';

require('./support/helpers.js')

contract('gasExperiment', () => {
  let Experiment = artifacts.require("examples/gasExperiment.sol");
  let exp;

  beforeEach(async () => {
    exp = await Experiment.new();
  });

  describe("#versionA", () => {
    it("works just fine", async () => {
      let tx = await exp.versionA();

      assert.isBelow(tx.receipt.gasUsed, 25000);
    });
  });

  describe("#versionB", () => {
    it("runs out of gas", async () => {
      let tx = await exp.versionB();

      assert.isBelow(tx.receipt.gasUsed, 25000);
    });
  });
});
