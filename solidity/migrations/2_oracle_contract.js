var Oracle = artifacts.require("./Oracle.sol");

module.exports = function(deployer) {
  deployer.deploy(Oracle, {gas: 6000000});
};
