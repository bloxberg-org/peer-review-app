const ReviewStorage = artifacts.require("ReviewStorage");

function init() {
  ReviewStorage.setProvider(self.web3.currentProvider);

}

exports.addReview = async (authorAddr, review) => {
  let self = this;
  ReviewStorage.setProvider(self.web3.currentProvider);
  let instance = await ReviewStorage.deployed();
  return instance.addReview(authorAddr, ...review);
}
exports.getReview = async (addr, index) => {
  let self = this;
  ReviewStorage.setProvider(self.web3.currentProvider);
  let instance = await ReviewStorage.deployed();
  return instance.getReview(addr, index)
}