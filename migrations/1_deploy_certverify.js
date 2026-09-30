const CertVerify = artifacts.require("CertVerify");

module.exports = function (deployer) {
  deployer.deploy(CertVerify);
};
