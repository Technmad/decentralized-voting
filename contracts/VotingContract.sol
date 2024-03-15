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

        constructor (){
            votingOrganizer = msg.sender;
        }

        function setCandidate(address _address, string memory _age, string memory _name, string memory _image, string memory _ipfs) public {

            required(votingOrganizer == msg.sender,
            "Only Voting Organizer can create candidate");

            _candidateId.increment();

            uint256 idNumber = _candidate.current();
            

            //storage instead of memory -> storage
            //replicates state changes

            Candidate storge candidate = candidate[_address];

            candidate.age = _age;
            candidate.name = _name;
            candidate.candidateId = idNumber;
            candidate.image = _image;
            candidate.voteCount = 0;
            candidate._address = _address;
            candidate.ipfs = _ipfs;

            candidateAdress.push(_address);

            emit CandidateCreate(idNumber, _age, _name, _image, candidate.voteCount, _address, _ipfs);
        }

        function getCandidate() public view returns (address[] memory){
            return candidateAdress;
        }

        function getCandidateLenght() public view returns (uint256){
            return candidateAdress.length;
        }

        function getCandidatedata(address _address) public view returns (string memory, string memory, uint256, string memory, uint256,string memory, address){

            return (
                candidate[_address].age, 
                candidate[_address].name, 
                candidate[_address].candidateId, candidate[_address].image, candidate[_address].voteCount, candidate[_address].ipfs, 
                candidate[_address]._address
                );
        }

        
        //----VOTER SECTION------

        function voterRight(string memory _name, string memory _image, address _address, string memory _ipfs) public {

            require(votingOrganizer == msg.sender, "Only Voting Organizer can create voter");

            _voterId.increment();

            uint256 idNumber = _voter.current();

            Voter storage voter = voters[_address];

            require(voter.voter_allowed == 0);

            voter.voter_allowed = 1;
            voter.voter_name = _name;
            voter.voter_image = _image;
            voter.voter_address = _address;
            voter.voter_id = idNumber;
            voter.voter_vote = 1000;
            voter.voter_voted = false;
            voter.voter_ipfs = _ipfs;
             

            votersAddress.push(_address);

            emit VoterCreated(idNumber, _name, _image, _address, voter.voter_allowed, voter.voter_voted, voter.voter_vote, _ipfs);
        }

        function vote( address _candidateAddress, uint256 _candidateVoteId) external {

            Voter storage voter = voters[msg.sender];

            require(!voter.voter_voted, "You have already voted");

            require(voter.voter_allowed != 0, "You are not allowed to vote");

            voter.voter_voted = true;
            voter.voter_vote = _candidateVoteId;

            votedVoters.push(msg.sender);

            candidates[_candidateAddress].voteCount += voter.voter_allowed;
            
        }

        function getVoterLength() public view returns (uint256){
            return votersAddress.length;
        }

        function getVotersData ( address _address) public view returns (uint256, string memory, string memory, address,bool, uint256, string memory){
           returns(
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_voted,
            voters[_address].voter_allowed,
            voters[_address].voter_ipfs
           );
        }

        function getVotedVoterList() public view returns (address[] memory){
            return votedVoters;
        }

        function getVoterList() public view returns (address[] memory){
            return votersAddress;
        }
}
