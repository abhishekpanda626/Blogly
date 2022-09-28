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
import React, { useState, useEffect } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ADD_NEW_USER= gql`
mutation Register($name:String!,$email:String!,$password:String!,$confirm:String!,$gender:String!,$contact:String!)
{
  register(input:{
    name:$name
    email:$email
    password:$password
    password_confirmation:$confirm
    gender:$gender
    contact_no:$contact
  })
  {
    status
  }
}

`;
 const Signup=()=> {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState("");
  const [eye, seteye] = useState(false);
  const [pass, setPass] = useState("");
  const [emailError,setEmailError]=useState("");
  const [nameError,setNameError]=useState("");
  const [passError,setPassError]=useState("");
  const [genderError,setGenderError]=useState("");
  const [confirmError,setConfirmError]=useState("");
  const [contactError,setContactError]=useState("");
  const [Register,{loading,error,data}] =useMutation(ADD_NEW_USER,{errorPolicy:"all"});

  const submitForm=(e)=> {
    e.preventDefault();

     Register({  variables:{name:name,email:email,password:pass,confirm:confirm,gender:gender,contact:contact}});
 
    if(data)
    {

    Swal.fire({
      position: "center",
      icon: "success",
      title: "you're signed up..",
      text: "Please login with your credential for access.",
      timer: 3000,
    });
    navigate("/signIn");
    }
    else if(error)
    {
      if(error.graphQLErrors[0].extensions.category==="validation")
      {
        
        setNameError(error.graphQLErrors[0].extensions.validation["input.name"]);
        setEmailError(error.graphQLErrors[0].extensions.validation["input.email"]);
        setGenderError(error.graphQLErrors[0].extensions.validation["input.gender"]);
        setPassError(error.graphQLErrors[0].extensions.validation["input.password"]);
        setConfirmError(error.graphQLErrors[0].extensions.validation["input.password_confirmation"]);
        setContactError(error.graphQLErrors[0].extensions.validation["input.contact_no"]);
        setTimeout(()=>{
          setNameError("")
          setGenderError("")
          setContactError("")
          setPassError("")
          setConfirmError("")
          setEmailError("")
         },3000)
       }
     
     
      else{

    Swal.fire({
      position: "center",
      icon: "error",
      title: "Some error occurred",
      text:"Plase try again",
      timer: 3000,
    });
   
      }
    }
   
  }
  function showPassword() {
    if (eye) {
      seteye(false);
    } else {
      setShowPass(pass);
      seteye(true);
    }
  }
  return (
    <>
      <div className="sign-up-my-container">
        <div className="card">
          <div className="form">
            <div className="sign-up-left-side">
              <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80" />
            </div>

            <div className="sign-up-right-side">
              <div className="register">
                <p>
                  Already a Member? <a href="/signIn">Sign in</a>
                </p>
              </div>
              <div id="signup">
                <h2> Welcome</h2>
              </div>

              <form >
                <div className="input_text">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    placeholder="Enter user name"
                    name="name"
                    value={name}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
               <p className={` ${!emailError ? "danger" : "show"}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {emailError}
                  </p>
                </div>
                <div className="input_text">
                  <FontAwesomeIcon icon={faPhone} />
                  <input
                    type="text"
                    placeholder="Enter Contact no"
                    name="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className={`input `}
                  />
                  <p className={` ${!contactError ? "danger" : "show"}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {contactError}
                  </p>
                </div>
                <div className={`input_text `}>
                  <small className="text-muted m-1">
                    Gender:&emsp;
                    <label className="gender">Male</label> &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      
                      onChange={(e) => setGender("Male")}
                    />
                     &emsp;
                    <label className="gender">Female</label> &nbsp;
                    <input
                      type="radio"
                      name="gender"
                      onChange={(e) => setGender("Female")}
                    />
                    &emsp;
                  <span className={` ${!genderError?"danger":"show"}`}><FontAwesomeIcon   icon={faWarning} size="sm"/> {genderError}</span>
                  </small>
                </div>
              
                <div className="input_text">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                   className={`input ` }
                    type={eye ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <FontAwesomeIcon
                    onClick={showPassword}
                    icon={eye ? faEyeSlash : faEye}
                  />
                 
                  <p className={` ${!passError ? "danger" : "show"}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {passError}
                  </p>
                  </div> <div className="input_text">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <input
                    
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    value={confirm}
                    onPaste={(e)=>{
                      e. preventDefault()
                      setConfirmError("You can't paste anything here")
                      setTimeout(()=>{setConfirmError("")},3000)
                      }} 
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                     <p className={` ${!confirmError ? "danger" : "show"}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {confirmError}
                  </p>
                </div>
              
                <div className="btn-login">
                  <button type="button" onClick={(e)=>submitForm(e)}>Sign up</button>
                </div>
              </form>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;