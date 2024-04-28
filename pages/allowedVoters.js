import React , {useCallback,useEffect,useState,useContext} from "react";
import {useRouter} from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VotingContext } from "../context/Voter";
import Style from '../styles/allowedVoter.module.css';
import images from '../assets';
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const allowedVoters = () => {
  const [fileURL, setFileURL] = useState(null);
  const [formInput, setFormInput] = useState({
    name : "",
    address : "",
    position : "",
  });
  const router = useRouter();
  const {uploadToIPFS, createVoter, voterArray, getAllVoterData} = useContext(VotingContext);

  const onDrop = useCallback(async(acceptedfile) => {
    const url = await uploadToIPFS(acceptedfile[0]);
    setFileURL(url);
  });

  const {getRootProps , getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getAllVoterData()
  }, [])


  return (
    <div className={Style.createVoter}>
      <div>
        {fileURL && (
          <div className={Style.voterInfo}>
            <img src = {fileURL} alt="Voter Image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name: <span>&nbps; {formInput.name}</span>,
              </p>
              <p>
                Add: <span>&nbps; {formInput.address}</span>,
              </p>
              <p>
                Pos: <span>&nbps; {formInput.position}</span>
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
                {voterArray.map((el , i) => (
                  <div key={i+1} className={Style.card_box}>
                    <div className={Style.image}>
                      <img src={el[4]} alt="Profile photo" />
                    </div>
                    <div className={Style.card_info}>
                      <p>{el[1]}</p>
                      <p>Address : {el[3].slice(0,10)}...</p>
                      {/* <p>Details</p> */}
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
          <h1>Create New Voter </h1>
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
            handleCLick={(e) => setFormInput({...formInput, name: e.target.value})}
          />
          <Input 
            inputType="text"
            title="Address"
            placeholder='Voter Address'
            handleCLick={(e) => setFormInput({...formInput, address: e.target.value})}
          />
          <Input 
            inputType="text"
            title="Position"
            placeholder='Voter Position'
            handleCLick={(e) => setFormInput({...formInput, position: e.target.value})}
          />
          <div className={Style.button}>
            <Button btnName = "Authorized Voter" handleCLick={() => createVoter(formInput, fileURL, router)}
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

export default allowedVoters;
