import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, gql } from '@apollo/client';
import {
  faCheck,
  faCircleCheck,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faMobile,
  faPhone,
  faUser,
  faWarning,
  faCamera
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Home() {
 
const[file,setFile]=useState('');
async function clickHandler()
{
    const Data = new FormData();
    Data.append(
        "operations",
        `{"query" :" mutation FileUpload($file:Upload!,$id:ID!){updateUserAvatar(avatar:$file,id:$id){name,avatar}}","variables": {"id":${1}}}`
      );
      Data.append("map", '{"0":["variables.file"]}');
      Data.append("0", file);
    
     console.log(file,Data)
     let result=await fetch("http://localhost:8000/graphql",{
        method:'POST',
      body:Data});
      console.log(result)

}
  return (
    <>
      <div>
        
      <div className="input_text">
        <h1>jj1</h1>
                {/* <div className="wrapper"> */}
                  {/* <FontAwesomeIcon className="upload" style={{color:"#e4ac74"}} icon={faCamera} />  */}
                  <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                {/* </div> */}
               
                <span  className="text-dark fw-bold" >Upload Profile Picture</span>
                </div>
                <button className="btn btn-primary" onClick={(e)=>{clickHandler()}}></button>
      </div>
    </>
  );
}
