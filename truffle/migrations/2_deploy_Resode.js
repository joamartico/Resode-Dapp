const Resode = artifacts.require('./Resode.sol');
const ResodeToken = artifacts.require('./ResodeToken.sol');
const ResodeTokenSale = artifacts.require('./ResodeTokenSale.sol');

module.exports = async function (deployer) {
  await deployer.deploy(Resode);

  // deployer.deploy(ResodeToken).then(function() {
  //   // Token price is 0.001 Ether
  //   var tokenPrice = 1000000000000000;
  //   return deployer.deploy(ResodeTokenSale, ResodeToken.address, tokenPrice);
  // });
};
