import React, { useState, useEffect } from "react";
import { useMutation, gql,useQuery } from '@apollo/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import userlogo from "../User/user.png";
import {
  faMessage,
  faCamera,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import ShowPost from "./ShowPost";
import { Navigate, useNavigate } from "react-router-dom";
const token=localStorage.getItem('access-token')
const id=localStorage.getItem('user_id');
// const USERS=gql`
// query user_all{
// users{
//   id,name,email,avatar
// }
// }
// `;


const ADD_POST=gql`
mutation AddPost($title:String!,$content:String!,$user_id:ID!){
  createPost(input:{
    title:$title
    content:$content
    user_id:$user_id
  })
  {
    id
    author{
      name
      email
    }
    title
    content
  }

}`;

export default function  AddPost() {
  const [show, setShow] = useState(true);
  const navigate=useNavigate();
  const handleClose = () => {setShow(false); navigate('/post/show')};
  const handleShow = () => setShow(true);
  const [file,setFile]=useState('');
const [AddPost]=useMutation(ADD_POST,{errorPolicy:"all"});
const [title,setTitle]=useState('');
const [content,setContent]=useState(''); 
const Data = new FormData();
let user=JSON.parse(localStorage.getItem('user'));
const postHandler=(e)=>{
  e.preventDefault();  
  AddPost({variables:{title:title,content:content,user_id:id}})
  .then(res=>
  {
    let pid=(res.data.createPost.id)
    console.log(pid);
    Data.append(
      "operations",
      `{"query" :" mutation FileUpload($file:Upload!,$id:ID!){uploadPost(file_path:$file,id:$id){title,file_path}}","variables": {"id":${pid}}}`
    );
    Data.append("map", '{"0":["variables.file"]}');
    Data.append("0", file);
  
    fetch("http://localhost:8000/graphql",{
      method:'POST',
    body:Data});
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/post/show');
  }
  )
 
 
}
  return (
    <>
    <Modal className='modal-div' show={show} backdrop="static" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>   <span className="post-avatar"><img
                      src=  {user.avatar?
                         `http://localhost:8000/${user.avatar}`
                         : 
                         userlogo
                        }
                        alt="Generic placeholder image"
                      className=" rounded-circle"
                      style={{  width: "50px",height:"45px"}}
                    />  <b style={{color:"#3b5998"}}>{user.name}</b>  </span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container-fluid ">
          
            <form action="" className="form-group">
         
            
            
              <div className="post_text">
                <FontAwesomeIcon icon={faPenToSquare} />
                <input
                  type="text"
                  id="title"
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="What's the status today?"
                />
                <div className="wrapper">
                  <FontAwesomeIcon className="upload icon-upload" icon={faCamera} />
                  <input type="file" onChange={(e)=>setFile(e.target.files[0])}  />
                </div>
              </div>
              <div className="post_text">
                <textarea className="form-control" id="body" onChange={(e)=>setContent(e.target.value)}></textarea>
              </div>
              <div>
                <button className="btn-post" onClick={(e)=>postHandler(e)}>Post</button>
              </div>
            </form>
          </div>
          
        
     
      
        </Modal.Body>
      
      </Modal>
      
    </>
  );
}
