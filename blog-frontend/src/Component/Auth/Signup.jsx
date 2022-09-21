import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [warnemail, setwarnemail] = useState(false);
  const [warnpass, setwarnpass] = useState(false);
  const [danger, setdanger] = useState(true);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState("");
  const [eye, seteye] = useState(false);
  const [pass, setPass] = useState("");

  function submitForm() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "you're signed up..",
      text: "Please login with your credential for access.",
      timer: 3000,
    });
    navigate("/signIn");
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
                  Already a Member? <a href="/signIn">Sign in</a>
                </p>
              </div>
              <div id="signup">
                <h2> Welcome</h2>
              </div>

              <form onSubmit={submitForm}>
                <div className="input_text">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className={`input`}
                  />
                </div>{" "}
                <div className="input_text">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    className={`input ${warnemail ? "warning" : ""}`}
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className={` ${danger ? "danger" : ""}`}>
                    <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />{" "}
                  </p>
                </div>
                <div className="input_text">
                  <FontAwesomeIcon icon={faPhone} />
                  <input
                    type="text"
                    placeholder="Enter Contact no."
                    name="contact"
                    onChange={(e) => setContact(e.target.value)}
                    className={`input`}
                  />
                </div>
                <div className="input_text">
                  <span className="text-muted m-1">
                    Gender:&emsp;
                    <label className="gender">Male</label>{" "}
                    <input
                      type="radio"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    &nbsp; <label className="gender">Female</label>{" "}
                    <input
                      type="radio"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </span>
                </div>
                <div className="input_text">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    className={` input ${warnpass ? "warning" : ""}`}
                    type={eye ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <FontAwesomeIcon
                    onClick={showPassword}
                    icon={eye ? faEyeSlash : faEye}
                  />
                  <FontAwesomeIcon icon={faCircleCheck} />{" "}
                  <input
                    style={{ marginTop: "10px" }}
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    onPaste={(e)=>{
                      e. preventDefault()
                      alert("You can't paste anything here")
                      return false;
                      }} 
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
                <div className="btn-login">
                  <button type="submit">Sign up</button>
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
