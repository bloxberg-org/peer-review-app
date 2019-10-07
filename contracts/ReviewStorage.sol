pragma solidity ^0.5.0;

contract ReviewStorage {
  address[] usersAddresses;
  enum Recommendation { ACCEPT, REVISE, REJECT }
  struct Review { 
    string journalId; // ISSN
    string manuscriptId; // DOI?
    uint timestamp; // Timestamp since unix epoch, when review is published
    Recommendation recommendation;
  }
  mapping (address => Review[]) reviewsMap;
  
  function addReview(string memory journalId, string memory manuscriptId, uint timestamp, 
    Recommendation recommendation) public {
    address sender = msg.sender;
    Review memory review = Review({
      journalId : journalId,
      manuscriptId : manuscriptId,
      timestamp : timestamp,
      recommendation : recommendation
    });
    reviewsMap[sender].push(review);
  }
  // function getReviews()
  function getReview(uint8 i) public view returns (string memory, string memory, uint, Recommendation) {
    Review[] memory reviews = reviewsMap[msg.sender];
    return (reviews[i].journalId, reviews[i].manuscriptId,
      reviews[i].timestamp, reviews[i].recommendation);
  }
  function getNumber(uint8 i) public view returns (uint) {
    return (i);
  }
  // function verifyReview()
}
