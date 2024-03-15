// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;
  
    // CANDIDATE FOR VOTING
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string  ipfs;
    }
    
    // to store data on blockchain
    // ipfs will contain all the data about candidate 

    event CandidateCreate (
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string  ipfs
    );

    address[] public candidateAdress;
    
    mapping(address => Candidate) public candidate;

    ////----------END OF CANDIDATE DATA

    //----------VOTER DATA

        address[] public votedVoters;

        address[] public votersAddress;
        mapping(address => Voter) public voters;

        struct Voter {
            uint256 voter_id;
            string voter_name;
            string voter_image;
            address voter_address;
            uint256 voter_allowed;
            bool voter_voted;
            uint256 voter_vote;
            string voter_ipfs;
        }

        event VoterCreated(
            uint256 indexed voter_id,
            string voter_name,
            string voter_image,
            address voter_address,
            uint256 voter_allowed,
            bool voter_voted,
            uint256 voter_vote,
            string voter_ipfs
        );

        //----END OF VOTER DATA

        
}