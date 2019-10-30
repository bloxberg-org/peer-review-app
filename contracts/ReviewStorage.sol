pragma solidity ^0.5.0;

/// @title A smart contract for storing peer reviews
/// @author Kaan Uzdogan uzdogan@mpdl.mpg.de
/// @notice
/// @dev
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
    mapping(address => bool) vouchersMap;
  }
  mapping (address => Review[]) reviewsMap; // An array of Reviews for each address
  mapping (address => uint24) reviewCounts;


  /// @notice Public method to add a review.
  /// @dev Assumes the owner(author) of the review is the msg.sender
  /// @param journalId - Typically ISSN number of the journal
  /// @param manuscriptId - An identifier for the manuscript. This could be an internal id of a journal.
  /// @param manuscriptHash - (Optional) Hash of the manuscript document
  /// @param timestamp - uint32 Unix timestamp when review is published
  /// @param recommendation - 0,1 or 2 for ACCEPT, REVIEW, REJECT
  function addReview(address author, string memory journalId, string memory manuscriptId, string memory manuscriptHash,
   uint32 timestamp, Recommendation recommendation) public {
    // address author = msg.sender;

    Review memory review = Review({
      journalId : journalId,
      manuscriptId : manuscriptId,
      manuscriptHash: manuscriptHash,
      timestamp : timestamp,
      recommendation : recommendation,
      verified: false,
      vouchers: new address[](0) // Init empty array
    });
    reviewsMap[author].push(review);
    reviewCounts[author]++;
  }

  /// @notice Returns the Review belonging to the paramater address on the parameter index.
  /// @dev Returns the Review struct as an ordered key value object. e.g. {0: 'JOURNALID', 1: ....}
  /// @param addr - The address of the author that is being queried.
  /// @param index - Index of the review in the Review array of the author.
  /// @return journalId
  /// @return manuscriptId
  /// @return manuscriptHash
  /// @return timestamp
  /// @return recommendation
  /// @return verified - bool that is true if 2 or more accounts vouched the review.
  /// @return vouchers - the list of addresses that vouched this review.
  // TODO: Can have another function to retrieve private information of msg.sender.
  function getReview(address addr, uint8 index) public view returns (string memory, string memory,
    string memory, uint32, Recommendation, bool, address[] memory) {
    Review[] memory reviews = reviewsMap[addr];
    return (reviews[index].journalId, reviews[index].manuscriptId, reviews[index].manuscriptHash,
      reviews[index].timestamp, reviews[index].recommendation, reviews[index].verified,
      reviews[index].vouchers);
  }

  function getReviewCount(address addr) public view returns (uint24) {
    return reviewCounts[addr];
  }

  /// @notice Function to vouch a Review at the given address and index.
  /// @dev Assumes the voucher is the msg.sender. Checks if the Review is already vouched by the same address.
  /// @param addr - The address of the author that is being queried.
  /// @param index - Index of the review in the Review array of the author.
  function vouch(address addr, uint8 index) public {
    // TODO: Can't vouch herself
    address voucher = msg.sender; // TODO: Avoid being vouched by a contract
    Review storage review = reviewsMap[addr][index];
    if (review.vouchersMap[voucher] == false){ // If not vouched by current voucher.
      review.vouchers.push(voucher); // Add to vouchers.
      review.vouchersMap[voucher] = true; // Mark voucher true.
    }
    if(review.vouchers.length == 1){
      review.verified = true;
    }
  }
  /// @notice Function to check if the Review at the given address and index is vouched by msg.sender8i.
  /// @dev Assumes the voucher is the msg.sender.
  /// @param addr - The address of the author that is being queried.
  /// @param index - Index of the review in the Review array of the author.
  /// @return bool showing that Review is vouched by the msg.sender.
  function hasVouched(address addr, uint8 index) public view returns(bool) {
    address voucher = msg.sender;
    Review storage review = reviewsMap[addr][index];
    return review.vouchersMap[voucher];
  }
  /// @notice Function to check if the Review at the given address and index is verified. I.e. vouched by 2 or more accounts.
  /// @param addr - The address of the author that is being queried.
  /// @param index - Index of the review in the Review array of the author.
  /// @return bool showing if Review is verified.
  function isVerified(address addr, uint index) public view returns(bool) {
    Review storage review = reviewsMap[addr][index];
    return review.verified;
  }
}
