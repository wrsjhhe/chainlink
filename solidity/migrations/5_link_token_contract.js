var LinkToken = artifacts.require("./LinkToken.sol");

module.exports = function(deployer) {
  deployer.deploy(LinkToken, {gas: 6000000});
};

