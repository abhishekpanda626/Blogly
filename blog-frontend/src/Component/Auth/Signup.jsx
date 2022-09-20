import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';
import "../../App.css";
export default function Signup() {

    const[email,setEmail]=useState('');
            
        const[warnemail,setwarnemail]=useState(false);
        const[warnpass,setwarnpass]=useState(false);
        const[danger,setdanger]=useState(true);
        const[name,setName]=useState('');
        const[contact,setContact]=useState('');
        const[gender,setGender]=useState('');
        const[confirm,setConfirm]=useState('');
        const [showPass,setShowPass]=useState('');
        const[eye,seteye]=useState(false);
       const[pass,setPass]=useState('');
        
      function submitForm()
      {
        alert("loggedin");
      }
     function showPassword(){
        if(eye)
        {
            seteye(false)
            
        }
        else
        {
            setShowPass(pass);
            seteye(true)
        }
      }
    return (
    <>
        <div className="container">
            <div className="card">
                <div className="form">
                    <div className="left-side">
                        <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80" />
                    </div>

                    <div className="right-side">
                        <div className="register">
                            <p>Already a Member? <a href="/signIn">Sign in</a></p>
                        </div>
                        <div className="hello">
                            <h2>Namaste🙏 | Welcome</h2>
                        </div>

                        <form onSubmit={submitForm}>

                            <div className="input_text">
                                <input type="text" placeholder="Enter Name" name="name"  onChange={(e)=>setName(e.target.value)} />
                           
                                <input type="email" placeholder="Enter E-Mail" name="email"  onChange={(e)=>setEmail(e.target.value)} />

                                <input type="text" placeholder="Enter Contact no." name="contact"  onChange={(e)=>setContact(e.target.value)} />
                            
                             Male   <input type="radio"  name="gender"  onChange={(e)=>setGender(e.target.value)} />
                             &nbsp; Female  <input type="radio" name="gender"  onChange={(e)=>setGender(e.target.value)} />
                            </div>
                            <div className="input_text">
                                <input className={` ${warnpass ? "warning" : "" }`} type={eye?"text":"password"}  placeholder="Enter Password" name="password"  onChange={(e)=>setPass(e.target.value)} />
                                <FontAwesomeIcon onClick={showPassword} icon={eye?faEyeSlash:faEye}/>
                            </div>
                            <input type="password" placeholder="Confirm Password" name="confirm"  onChange={(e)=>setConfirm(e.target.value)} />
                            <div className="recovery">
                                <br />
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
