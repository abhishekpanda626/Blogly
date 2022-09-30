import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, gql, ApolloError } from '@apollo/client';
import Swal from "sweetalert2";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "../../App.css";
import { GraphQLError } from "graphql";
import {  useNavigate } from "react-router-dom";
import { Input } from "react-bootstrap-form";
const SIGN_IN= gql`
mutation Login($email:String!,$pass:String!){
  login(input:{username:$email,password:$pass}){
    access_token
    user{
      id
      name email contact_no gender avatar
      posts{
        title
        content
        file_path
        user_id
        comment{
          comment
          file_path
          post_id
          user_id
        }
      }
     
    }
  }
}

`;
export default function UserLogin() {
  localStorage.clear();
  const [Login,{loading,error,data}] =useMutation(SIGN_IN,{errorPolicy:"all"});
  const [email, setEmail] = useState("");
  const [warnemail, setwarnemail] = useState(false);
  const [warnpass, setwarnpass] = useState(false);
  const [danger, setdanger] = useState(true);
  const [pwddanger, setpwddanger] = useState(true);
  const [showPass, setShowPass] = useState("");
  const [eye, seteye] = useState(false);
  const [pass, setPass] = useState("");
const [passError,setPassError]=useState("");
const [emailError,setEmailError]=useState("");
const navigate=useNavigate();
  function ValidateEmail() 
{

 if(!(email)){
    setwarnemail(true);
    setdanger(false);
    setEmailError("Email id is required");
   
  }
 else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    setwarnemail(true);
    setdanger(false);
    setEmailError("Invalid email address format!!");
  
  }
  else{
    setwarnemail(false);
    setdanger(true);
    
  }
 
  
}
function validatePassword(){
    var passw= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
    
   if(!pass)
   {
    setwarnpass(true)
    setpwddanger(false)
    setPassError("Password is required")
   }
   else if(!passw.test(pass)){
        setwarnpass(true)
        setpwddanger(false)
        setPassError("Invalid Password format")
     
    }
else if(pass.length<8)
{
  setPassError("Password length should be minimum of 8 character")
  setwarnpass(true)
  setpwddanger(false)
}
    else
    {
        setpwddanger(true)
        setwarnpass(false)
        
    }
}



  function loginHandler(e) {
    e.preventDefault();
   validatePassword();
    ValidateEmail();
   Login({variables:{email:email,pass:pass}})
  
  
 
  // else if((error.graphQLErrors[0].extensions.category==="validation"))
  // {
  //   setEmailError(error.graphQLErrors[0].extensions.validation["input.username"])

  //   setPassError(error.graphQLErrors[0].extensions.validation["input.password"])
  // }
  }
  function handleAlert(){
    if(data){
      localStorage.setItem("access-token",data.login.access_token)
      localStorage.setItem("user_id",data.login.user.id)
      localStorage.setItem("user",JSON.stringify(data.login.user))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Logged in..',
        text:"The Currency of Blogging is authenticity and trust.Happy Blogging 😍",
        showConfirmButton: false,
        timer: 3000
      })
      navigate('/profile')
      
    }
    else if(error)
    {
      if((error.graphQLErrors[0].extensions.category==="authentication"))
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.graphQLErrors[0].extensions.reason,
          text:"Please Try Again!!",
          showConfirmButton: false,
          timer: 3000
        })
       
        
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
      <div className="my-container">
        <div className="card">
          <div className="form">
            <div className="left-side">
              <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80" />
            </div>

            <div className="right-side">
              <div className="register">
                <p>
                  Not a member? <a href="/signup">Register Now</a>
                </p>
              </div>

              <div className="hello">
                <h2>Hello Again!</h2>
              </div>

              <form >
                <div className="input_text">
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  <input
                    className={`  ${warnemail ? "warning" : ""}`}
                    type='email'
                    name="email"
                    placeholder="Enter  e-mail address."
                    onBlur={(e)=>ValidateEmail(e.target.value)}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className={` ${danger ? "danger" : ""}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {emailError}
                  </p>
                </div>
                <div className="input_text">
                  <FontAwesomeIcon icon={faLock} />{" "}
                  <input
                    className={` ${warnpass ? "warning" : ""} `}
                    type={eye ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    onBlur={(e)=>validatePassword(e.target.value)}
                    onChange={(e) => setPass(e.target.value)}
                    id="text"
                  />
                  <FontAwesomeIcon
                    onClick={showPassword}
                    icon={eye ? faEyeSlash : faEye}
                  />
                   <p className={` ${pwddanger ? "danger" : ""}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/> {passError}
                  </p>
                </div>
                <div className="recovery">
                  <br />
                </div>
                <div id="login" className="btn-login">
                  <button type="button" onClick={(e)=>handleAlert()} onMouseOver={(e)=>loginHandler(e)}>Sign in</button>
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
