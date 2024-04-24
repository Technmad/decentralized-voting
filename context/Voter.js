//external imports 
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

//internal imports
import { votingAddress, votingAddressABI } from "../context/constants";

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(votingAddress, votingAddressABI, signerOrProvider);
};

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const votingTitle = "My Voting DApp";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  //end of candidate data 

  const [error, setError] = useState('');
  const highestVote = [];

  //voter section
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);


  
  return (
    <VotingContext.Provider value={{ votingTitle }}>
      {children}
    </VotingContext.Provider>
  );
};

function Voter() {
  return <div>Voter</div>;
}

export default Voter;
