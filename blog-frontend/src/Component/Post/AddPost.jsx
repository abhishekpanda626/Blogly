import React, { useState, useEffect } from "react";
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faCamera,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import ShowPost from "./ShowPost";
import Profile from "../User/Profile";
const token=localStorage.getItem('access-token')
const id=localStorage.getItem('user_id');
const ADD_POST=gql`
mutation AddPost($title:String!,$content:String!,$user_id:ID!){
  createPost(input:{
    title:$title
    content:$content
    user_id:$user_id
  })
  {
    author{
      name
      email
    }
    title
    content
  }

}`;


const  AddPost=()=> {
const [AddPost,{loading,error,data}]=useMutation(ADD_POST,{errorPolicy:"all"});
const [title,setTitle]=useState('');
const [content,setContent]=useState('');  
const Avatar = (
    <Image
      src={"https://github.com/mshaaban0.png"}
      alt="UserName profile image"
      roundedCircle
      style={{ width: "25px" }}
    />
  );
  
const postHandler=(e)=>{
  e.preventDefault();
  
  AddPost({variables:{title:title,content:content,user_id:id}});
  console.log(data);
}
  return (
    <>
      <div className="container-fluid h-100 d-inline-block">
        <div className="row d-xl-flex">
          <div className="col-sm-3 mt-5 ">
          
          </div>
          <div className="col-md-5 m-5 ">
            <form action="" className="form-group">
              <span className="post-avatar">{Avatar} Samwell Tarly</span>
              <div className="post_text">
                <FontAwesomeIcon icon={faPenToSquare} />
                <input
                  type="text"
                  id="title"
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="What's the status today?"
                />
                <div className="wrapper">
                  <FontAwesomeIcon className="upload" icon={faCamera} />
                  <input type="file" />
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
          <div className="col-sm-3 mt-5">
            <div className="headings">Profile</div>
            <Profile />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
export default  AddPost;