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
    assert.deepEqual(addedReview, reviewObj, 'Contract response does not match expected values')
  });

  it("should vouch a review", async () => {
    let accounts = await web3.eth.getAccounts();
    let author = accounts[0];
    let index = 0; // Index of the review.
    let voucher1 = accounts[1];
    console.log(voucher1);
    let voucher2 = accounts[2];

    let instance = await ReviewStorage.deployed();
    await instance.vouch(author, index, { // Vouch first Review of the first account.
      from: voucher1
    });

    let review = await instance.getReview(author, index);
    let vouchers = review[6];
    let expectedVouchers = [voucher1];
    assert.deepEqual(vouchers, expectedVouchers, 'Vouchers of review not as expected')
  })
});