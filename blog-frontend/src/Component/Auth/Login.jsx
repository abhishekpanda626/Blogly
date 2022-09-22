import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, gql } from '@apollo/client';
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
const SIGN_IN= gql`
mutation Login($email:String!,$pass:String!){
  login(input:{username:$email,password:$pass}){
    access_token
    user{
      id
      name email contact_no gender 
      posts{
        comments{
          id
          comment
          
        }
      }
    }
  }
}

`;
const UserLogin=()=> {
  const [Login] =useMutation(SIGN_IN);
  const [email, setEmail] = useState("");
  const [warnemail, setwarnemail] = useState(false);
  const [warnpass, setwarnpass] = useState(false);
  const [danger, setdanger] = useState(true);
  const [pwddanger, setpwddanger] = useState(true);
  const [showPass, setShowPass] = useState("");
  const [eye, seteye] = useState(false);
  const [pass, setPass] = useState("");
const [passError,setPassError]=useState("");
  function ValidateEmail(mail) 
{
 if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    console.log("email:",mail);
    setwarnemail(true)
    setdanger(false)
    return false;
  }
  return true;
  
}
function validatePassword(password){
    var passw= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
    
     if(!passw.test(password)){
        setwarnpass(true)
        setpwddanger(false)
       password.focus();
       return false;
    }

    else
    {
        setpwddanger(true)
        return true;
    }
}



  function loginHandler(e) {
    e.preventDefault();
   Login({variables:{email:email,pass:pass}})
   .then((data)=>{
    localStorage.setItem("access-token",data.data.login.access_token)
  
  })
   .catch((err)=>console.log(err));
   // console.log(email,pass)

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
                    className={` input ${warnemail ? "warning" : ""}`}
                    type="text"
                    name="email"
                    placeholder="Enter  e-mail address."
                    onBlur={(e)=>ValidateEmail(e.target.value)}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className={` ${danger ? "danger" : ""}`}>
                    <FontAwesomeIcon icon={faWarning} size="sm"/>   Please enter a valid email
                    address.
                  </p>
                </div>
                <div className="input_text">
                  <FontAwesomeIcon icon={faLock} />{" "}
                  <input
                    className={` ${warnpass ? "warning" : ""}`}
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
                    <FontAwesomeIcon icon={faWarning} size="sm"/> min 8 characters which contain at least one numeric digit and a special character
                  </p>
                </div>
                <div className="recovery">
                  <br />
                </div>
                <div id="login" className="btn-login">
                  <button type="button" onClick={(e)=>loginHandler(e)}>Sign in</button>
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
export default UserLogin;