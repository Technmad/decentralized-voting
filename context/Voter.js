import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

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
