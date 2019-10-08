const ReviewStorage = artifacts.require("ReviewStorage");

contract("ReviewStorage test", async accounts => {
  it("should add and get a Review", async () => {
    let instance = await ReviewStorage.deployed();
    let journalId = 'Springer Nature';
    let manuscriptId = 'Xjde219kd12k';
    let manuscriptHash = '312302ijq0pdekiqj213k2';
    let timeStamp = new Date();
    timeStamp = Math.trunc(timeStamp.getTime()/1000); // Get Unix timestamp
    let recommendation = 0;
    let verified = false;
    let vouchers = [];

    await instance.addReview(journalId, manuscriptId, manuscriptHash, timeStamp, recommendation);
    let addedReview = await instance.getReview(accounts[0], 0);
    let reviewArr = [journalId, manuscriptId, manuscriptHash, web3.utils.toBN(timeStamp),
       web3.utils.toBN(recommendation), verified, vouchers];
    let reviewObj = Object.assign({}, reviewArr);
    console.log(addedReview);
    assert.deepEqual(addedReview, reviewObj, 'Contract response does not match expected values')
  });
});