// const Project = artifacts.require("Project");
// const SafeMath = artifacts.require("@openzeppelin/contracts/utils/math/SafeMath.sol");
const Crowdfunding = artifacts.require("Crowdfunding");

module.exports = function(deployer) {
//  deployer.deploy(Project);
 deployer.deploy(Crowdfunding);
};