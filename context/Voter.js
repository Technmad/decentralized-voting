//external imports
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

//internal imports
import { votingAddress, votingAddressABI } from "../context/constants";

// const client = ipfsHttpClient({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(votingAddress, votingAddressABI, signerOrProvider);
};

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const votingTitle = "My Voting DApp";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  //end of candidate data

  const [error, setError] = useState("");
  const highestVote = [];

  //voter section
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);

  //connect metamask
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("Please Install MetaMask & Connect Your Wallet");
    }
  };

  //connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(account[0]);
  };

  //upload to ipfs voter image
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading file to IP");
    }
  };

  //upload to ipfs candidate image
  const uploadToIPFSCandidate = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading file to IP");
    }
  };

  //create voter
  const createVoter = async (formInput, fileURL, router) => {
    try {
      const { name, address, position } = formInput;

      if (!name || !address || !position)
        return setError("Input Data Is Missing");

      //connect smart contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, position, image: fileURL });
      const added = await client.add(data);

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const voter = await contract.voterRight(address, name, url, fileURL);
      voter.wait();

      router.push("/voterList");
    } catch (error) {
      setError("Something went wrong creating data");
    }
  };

  //get voter data
  const getAllVoterData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);

      voterListData.map(async (el) => {
        const singleVoterData = await contract.getVoterdata(el);
        pushVoter.push(singleVoterData);
      });

      const voterList = await contract.getVoterLength();
      setVoterLength(voterList.toNumber());
    } catch (error) {
      setError("Something went wrong fetching data");
    }
  };

  // useEffect(() => {
  //   getAllVoterData();
  // }, []);

  //give vote
  const giveVote = async (id) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //candidate section
  const setCandidate = async (candidateFrom, fileURL, router) => {
    try {
      const { name, address, age } = candidateFrom;

      if (!name || !address || !age) return setError("Input Data Is Missing");

      //connect smart contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, image: fileURL, age });
      const added = await client.add(data);

      const ipfs = `https://ipfs.infura.io/ipfs/${added.path}`;
      const voter = await contract.setCandidate(
        address,
        age,
        name,
        fileURL,
        ipfs
      );
      voter.wait();

      router.push("/");
    } catch (error) {
      setError("Something went wrong creating data");
    }
  };

  //get candidate data
  const getNewCandidate = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const allCandidate = await contract.getCandidate();

      allCandidate.map(async (el) => {
        const singleCandidateData = await contract.getCandidatedata(el);

        pushCandidate.push(singleCandidateData);
        candidateIndex.push(singleCandidateData[2].toNumber());
      });

      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewCandidate();
  }, []);

  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray,
        uploadToIPFSCandidate,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

function Voter() {
  return <div>Voter</div>;
}

export default Voter;
