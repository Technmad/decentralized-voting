import React , {useCallback,useEffect,useState,useContext} from "react";
import {useRouter} from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VotingContext } from "@/context/Voter";
import Style from '@/styles/allowedVoter.module.css';
import images from '@/assets';
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";



const allowedVoters = () => {
  return <div>allowedVoters</div>;
};

export default allowedVoters;
