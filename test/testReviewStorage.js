const ReviewStorage = artifacts.require("ReviewStorage");

contract("ReviewStorage test", async accounts => {
  it("should add and get a Review", async () => {
    let instance = await ReviewStorage.deployed();
    let accounts = await web3.eth.getAccounts();
    let author = accounts[0];
    let expectedReviewCount = (await instance.getReviewCount(author)).toNumber() + 1;
    let journalId = 'Springer Nature';
    let manuscriptId = 'Xjde219kd12k';
    let manuscriptHash = '312302ijq0pdekiqj213k2';
    let timeStamp = new Date();
    timeStamp = Math.trunc(timeStamp.getTime() / 1000); // Get Unix timestamp
    let recommendation = 0;
    let verified = false;
    let vouchers = [];

    await instance.addReview(journalId, manuscriptId, manuscriptHash, timeStamp, recommendation);
    let addedReview = await instance.getReview(author, 0);
    let reviewCount = (await instance.getReviewCount(author)).toNumber();
    let reviewArr = [journalId, manuscriptId, manuscriptHash, web3.utils.toBN(timeStamp),
      web3.utils.toBN(recommendation), verified, vouchers];
    let reviewObj = Object.assign({}, reviewArr); // Need to convert to format: {0: 'Springer Nature, 1: 'Xjde219kd12k' ...}

    assert.equal(reviewCount, expectedReviewCount, 'Review counts do not match')
    assert.deepEqual(addedReview, reviewObj, 'Contract response does not match expected values')
  });
  it("should vouch a review", async () => {
    let accounts = await web3.eth.getAccounts();
    let author = accounts[0];
    let index = 0; // Index of the review.
    let voucher1 = accounts[1];

    let instance = await ReviewStorage.deployed();
    await instance.vouch(author, index, { from: accounts[1] });

    let review = await instance.getReview(author, index, { from: accounts[1] });
    let hasVouched = await instance.hasVouched(author, index, { from: accounts[1] });
    let vouchers = review[6]; // Index 6 of returned Review object
    let expectedVouchers = [voucher1];

    assert.equal(hasVouched, true, 'Review not marked vouched by the _msgSender()');
    assert.deepEqual(vouchers, expectedVouchers, 'Vouchers of review not as expected');
  })

  it("should not be vouched twice by the same account", async () => {
    let accounts = await web3.eth.getAccounts();
    let author = accounts[0];
    let index = 0; // Index of the review.
    let voucher1 = accounts[1];

    let instance = await ReviewStorage.deployed();
    await instance.vouch(author, index, { from: voucher1 });

    let review = await instance.getReview(author, index, { from: voucher1 });
    let hasVouched = await instance.hasVouched(author, index, { from: voucher1 });
    let vouchers = review[6]; // Index 6 of returned Review object
    let expectedVouchers = [voucher1];

    assert.equal(hasVouched, true, 'Review not marked vouched by the _msgSender()');
    assert.deepEqual(vouchers, expectedVouchers, 'Vouchers of review not as expected');
  })

  it("should be verified when vouched by two different accounts", async () => {
    let accounts = await web3.eth.getAccounts();
    let author = accounts[0];
    let index = 0; // Index of the review.
    let voucher1 = accounts[1];
    let voucher2 = accounts[2];

    let instance = await ReviewStorage.deployed();
    await instance.vouch(author, index, { from: voucher2 });

    let isVerified = await instance.isVerified(author, index, { from: voucher2 });
    assert.equal(isVerified, true, 'Review not marked verified after 2 vouches');
  })
});