const Resode = artifacts.require("Resode");
const ResodeToken = artifacts.require("ResodeToken");
const ResodeTokenSale = artifacts.require("ResodeTokenSale");



module.exports = function (deployer) {
  deployer.deploy(Resode);

  deployer.deploy(ResodeToken).then(function() {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(ResodeTokenSale, ResodeToken.address, tokenPrice);
  });
};
