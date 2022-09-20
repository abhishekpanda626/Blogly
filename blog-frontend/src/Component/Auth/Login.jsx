import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';
import "../../App.css";
export default function UserLogin() {

    const[email,setEmail]=useState('');
            
        const[warnemail,setwarnemail]=useState(false);
        const[warnpass,setwarnpass]=useState(false);
        const[danger,setdanger]=useState(true);
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
                            <p>Not a member? <a href="/signup">Register Now</a></p>
                        </div>

                        <div className="hello">
                            <h2>Hello Again!</h2>
                           
                        </div>

                        <form onSubmit={submitForm}>

                            <div className="input_text">
                                <input className={` ${warnemail ? "warning" : "" }`} type="text" placeholder="Enter Email" name="email"  onChange={(e)=>setEmail(e.target.value)} />
                                <p className={` ${danger ? "danger" : "" }`}><i className="fa fa-warning"></i>Please enter a valid email address.</p>
                            </div>
                            <div className="input_text">
                                <input className={` ${warnpass ? "warning" : "" }`} type={eye?"text":"password"}  placeholder="Enter Password" name="password"  onChange={(e)=>setPass(e.target.value)} />
                                <FontAwesomeIcon onClick={showPassword} icon={eye?faEyeSlash:faEye}/>
                            </div>
                            <div className="recovery">
                                <br />
                            </div>
                            <div className="btn-login">
                                <button type="submit">Sign in</button>
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
