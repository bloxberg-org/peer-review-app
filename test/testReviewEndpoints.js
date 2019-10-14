const ReviewStorage = artifacts.require("ReviewStorage");
const server = require('../server/server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

contract("Review Endpoints", accounts => {
  let base = '/users/' + accounts[0];
  let endpoint = base + '/reviews/'
  describe('/POST review', () => {
    it('should add a review', async () => {
      let review = {
        journalId: 'Springer Nature',
        manuscriptId: 'XCdsa3123214',
        manuscriptHash: '312302ijq0pdekiqj213k2',
        timeStamp: Math.trunc((new Date()).getTime()/1000), // Get Unix timestamp
        recommendation: 0
      }
      chai.request(server)
      .post(endpoint)
      .send(review)
      .end((err, res) => {
        assert.equal(res.status, 200, `Response status is not 200 but ${res.status}`)
      })
    })
  })
})