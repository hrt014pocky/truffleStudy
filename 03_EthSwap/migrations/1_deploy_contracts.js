// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const ApeCoin = artifacts.require("ApeCoin");

module.exports = function(deployer) {
  deployer.deploy(ApeCoin);
};
