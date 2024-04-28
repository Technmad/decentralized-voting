import React , {useCallback,useEffect,useState,useContext} from "react";
import {useRouter} from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VotingContext } from "../context/Voter";
import Style from '../styles/allowedVoter.module.css';
import images from '../assets/images';
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const candidateRegistration = () => {
  const [fileURL, setFileURL] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name : "",
    address : "",
    age : "",
  });
  const router = useRouter();
  const { setCandidate, uploadToIPFSCandidate, candidateArray, getNewCandidate} = useContext(VotingContext);

  const onDrop = useCallback(async(acceptedfile) => {
    const url = await uploadToIPFSCandidate(acceptedfile[0]);
    setFileURL(url);
  });

  const {getRootProps , getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => [
    getNewCandidate()
  ], []);

  return (
    <div className={Style.createVoter}>
      <div>
        {fileURL && (
          <div className={Style.voterInfo}>
            <img src = {fileURL} alt="Voter Image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name: <span>&nbps; {candidateForm.name}</span>,
              </p>
              <p>
                Add: <span>&nbps; {candidateForm.address}</span>,
              </p>
              <p>
                Age: <span>&nbps; {candidateForm.age}</span>
              </p>
            </div>
          </div>
        )}
        {!fileURL && (
            <div className={Style.sideInfo}>
              <div className={Style.sideInfo_box}>
                <h4>Create Candidate For Voting</h4>
                <p>Blockchain based voting system</p>
                <p className={Style.sideInfo_para}>Contract Candidate List</p>
              </div>
              <div className={Style.card}>
                {candidateArray.map((el , i) => (
                  <div key={i+1} className={Style.card_box}>
                    <div className={Style.image}>
                      <img src={el[3]} alt="Profile photo" />
                    </div>
                    <div className={Style.card_info}>
                      <p>{el[1]} #{el[2].toNumber()}</p>
                      <p>{el[0]}</p>
                      <p>Address: {el[6].slice(0,10)}..</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
          )
        }
      </div>
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Candidate </h1>
          <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter_container_box_div_info}>
                  <p>Upload File: JPG,PNG,GIF,WEBM Max 10MB</p>
                  <div className={Style.voter_container_box_div_image}>
                    <Image 
                    src={images.upload} 
                    width={150} 
                    height={150} 
                    objectFit="contain" 
                    alt="File Upload"
                    />
                  </div>
                  <p>Drag & Drop</p>
                  <p>or Browse Media on your device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.input_container}>
          <Input 
            inputType="text"
            title="Name"
            placeholder='Voter Name'
            handleCLick={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
          />
          <Input 
            inputType="text"
            title="Address"
            placeholder='Voter Address'
            handleCLick={(e) => setCandidateForm({...candidateForm, address: e.target.value})}
          />
          <Input 
            inputType="text"
            title="Age"
            placeholder='Voter Age'
            handleCLick={(e) => setCandidateForm({...candidateForm, age: e.target.value})}
          />
          <div className={Style.button}>
            <Button btnName = "Authorized Candidate" handleCLick={() => setCandidate(candidateForm, fileURL, router)}
            />
          </div>
        </div>
      </div>
      <div className={Style.createdVoter}>
        <div className={Style.createVoter_info}>
          <Image src = {images.creator} alt = "User Profile" />
          <p>Notice For User</p>
          <p>Organiser <span>0x99999</span></p>
          <p>Only Organiser of the voting contract can create voter for voting in election.</p>
        </div>
      </div>
    </div>
  )
};

export default candidateRegistration;
