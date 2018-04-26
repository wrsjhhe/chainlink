let LinkToken = artifacts.require("../node_modules/smartcontractkit/chainlink/solidity/contracts/LinkToken.sol");
let RunLog = artifacts.require("./RunLog.sol");
let devnetAddress = "0x9CA9d2D5E04012C9Ed24C0e513C9bfAa4A2dD77f";

module.exports = function(deployer) {
  return LinkToken.deployed().then(function(linkInstance) {
    return RunLog.deployed().then(function(runLogInstance) {
      return linkInstance.transfer(runLogInstance.address, web3.toWei(1000)).then(function() {
        return linkInstance.transfer(devnetAddress, web3.toWei(1000));
      });
    }).then(console.log, console.log);
  }).then(null, console.log);
};
