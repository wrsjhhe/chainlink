'use strict';

require('./support/helpers.js')

contract('ConcreteChainlinked', () => {
  let Link = artifacts.require("LinkToken.sol");
  let Oracle = artifacts.require("Oracle.sol");
  let Chainlinked = artifacts.require("examples/ConcreteChainlinked.sol");
  let GetterSetter = artifacts.require("examples/GetterSetter.sol");
  let jobId = "4c7b7ffb66b344fbaa64995af81e355a";
  let cc, gs, oc, link;
  let gasPeak = 6700000;

  beforeEach(async () => {
    link = await Link.new({gasLimit:gasPeak, gas: gasPeak});
    //link.defaults({gasLimit: gasPeak});
    oc = await Oracle.new({gasLimit:gasPeak, gas: gasPeak});
    gs = await GetterSetter.new({gasLimit:gasPeak, gas: gasPeak});
    cc = await Chainlinked.new(link.address, oc.address, {gasLimit:gasPeak, gas: gasPeak});
    //cc.defaults({gasLimit: gasPeak});
  });

  describe("#newRun", () => {
    it("forwards the information to the oracle contract through the link token", async () => {
      console.log("**** STARTING PUBLIC NEW RUN");
      let tx = await cc.publicNewRun(
        jobId,
        gs.address,
        "requestedBytes32(uint256,bytes32)",
        {gas:gasPeak, gasLimit: gasPeak});

      console.log("** GAS USED: ", tx.receipt.gasUsed);
      assert.isBelow(tx.receipt.gasUsed, 1000000);

      assert.equal(3, tx.receipt.logs.length);
      let transferLog = tx.receipt.logs[0];
      let transferAndCallLog = tx.receipt.logs[1];
      let oracleLog = tx.receipt.logs[2];

      let expected = "0x" + lPadHex("1") + // version number
        lPadHex("40") + // payload offset
        lPadHex("60") + // total payload length
        lPadHex("0") + // payload prefix
        lPadHex("0") + // payload internal length
        lPadHex("0"); // payload internal value
      assert.equal(expected, oracleLog.data);
    });
  });
});
