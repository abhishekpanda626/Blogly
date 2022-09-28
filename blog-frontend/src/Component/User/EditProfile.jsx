import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faWarning,faEnvelope,faPhone,faLock,faEyeSlash,faEye,faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useMutation,useQuery,gql } from "@apollo/client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
let valname,valcontact,valgender,valfile,valemail;
const uid=localStorage.getItem("user_id")
const SHOW_USER=gql`
query me($id:ID)
{
user(id:$id)
{
  id,name,gender,contact_no,email
}
}
`;
const EDIT_USER=gql`
mutation editUser($id:ID!$name:String,$contact:String)
{
  updateUser(input:{id:$id,name:$name,contact_no:$contact})
  {
    id
      name email contact_no gender avatar
      posts{
        title
        content
        file_path
        comment{
          comment
          file_path
        }
      }
     
  }
}
`;
export default function EditProfile() {
  const{loading,error,data}=useQuery(SHOW_USER,{variables:{id:uid}});
  const[edituser]=useMutation(EDIT_USER)
  const [show, setShow] = useState(true);
  const navigate=useNavigate();
  const handleClose = () => {setShow(false); navigate('/profile')};
  const [name,setName]=useState('');
  const [contact,setContact]=useState('');
  const [nameError,setNameError]=useState("");
  const [genderError,setGenderError]=useState("");
  const [contactError,setContactError]=useState("");
  const[file,setFile]=useState('');
  if(data)
  {
    valemail=data.user.email;
    valname=data.user.name;
    valcontact=data.user.contact_no;
    valgender=data.user.gender;
   // valfile=data.user.file_path;
  }
  
  function handleEdit()
  {
    if(!name)
    {
      setName(valname)
    }
    if(!contact)
    {
      setContact(valcontact)
    }
    else
    {
      edituser({variables:{id:uid,name:name,contact:contact}})
      .then((res=>{
        localStorage.setItem("user",JSON.stringify(res.data.updateUser))
      }))
      ;
    navigate('/profile');
    }
    
  }
  return (
    <>
<Modal className='modal-div' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
                <div className="input_text">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    placeholder="Enter user name"
                    name="username"
                    defaultValue={valname}
                    onChange={(e) => {setName(e.target.value)}}
                    className={`input`}
                   
                  />
                   <p className={` ${!nameError ? "danger" : "show"}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {nameError}
                  </p>
                </div>
                
                <div className="input_text">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    className={`input`}
                    type="text"
                    placeholder="Enter Email Address"
                    name="email"
                    defaultValue={valemail}
                    disabled
                  />
              <span className="text-danger"><FontAwesomeIcon icon={faWarning} />You can't change email address.</span>
                </div>
                <div className="input_text">
                  <FontAwesomeIcon icon={faPhone} />
                  <input
                    type="text"
                    placeholder="Enter Contact no"
                    name="contact"
                    defaultValue={valcontact}
                    onChange={(e) => setContact(e.target.value)}
                    className={`input `}
                  />
                  <p className={` ${!contactError ? "danger" : "show"}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {contactError}
                  </p>
                </div>
                <div className={`input_text `} >
                  <small className="text-muted m-1">
                    Gender:&emsp;
                    <label className="gender">Male</label> &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      checked={valgender==="Male"}
                      value="Male"
                      disabled
                    />
                     &emsp;
                    <label className="gender">Female</label> &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      checked={valgender==="Female"}
                      value="Female"
                      disabled
                    />
                    &emsp;
                  <span className={` ${!genderError?"danger":"show"}`}><FontAwesomeIcon   icon={faWarning} size="sm"/> {genderError}</span>
                  </small>
                </div>
              
  
                
              </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>{handleEdit()}}>
            Edit Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
