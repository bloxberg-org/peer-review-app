pragma solidity ^0.5.0;

contract ReviewStorage {
  address[] usersAddresses;
  enum Recommendation { ACCEPT, REVISE, REJECT }
  struct Review {
    string journalId; // ISSN
    string manuscriptId; // DOI?
    string manuscriptHash;
    uint32 timestamp; // Unix time (32 bits), when review is published
    Recommendation recommendation;
    bool verified;
    address[] vouchers;
  }
  mapping (address => Review[]) reviewsMap;


  function addReview(string memory journalId, string memory manuscriptId, string memory manuscriptHash,
   uint32 timestamp, Recommendation recommendation) public {
    address sender = msg.sender;
    Review memory review = Review({
      journalId : journalId,
      manuscriptId : manuscriptId,
      manuscriptHash: manuscriptHash,
      timestamp : timestamp,
      recommendation : recommendation,
      verified: false,
      vouchers: new address[](0) // Init empty array
    });
    reviewsMap[sender].push(review);
  }
  // function getReviewCount() public view returns(uint32 count){
  //   return reviewsMap[addr].length;
  // }

  // Get Review for any address.
  // Can have another function to retrieve private information of msg.sender.
  function getReview(address addr, uint8 i) public view returns (string memory, string memory,
    string memory, uint32, Recommendation, bool, address[] memory) {
    Review[] memory reviews = reviewsMap[addr];
    return (reviews[i].journalId, reviews[i].manuscriptId, reviews[i].manuscriptHash,
      reviews[i].timestamp, reviews[i].recommendation, reviews[i].verified, reviews[i].vouchers);
  }

  function vouch(address addr, uint8 index) public {
    Review storage review = reviewsMap[addr][index];
    review.vouchers.push(msg.sender);
    if(review.vouchers.length == 2){
      review.verified = true;
    }
  }

  function getNumber(uint8 i) public pure returns (uint) {
    return (i);
  }
  // function verifyReview()
}
