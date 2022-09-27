import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import userlogo from "./user.png";
import Swal from "sweetalert2";
const id=localStorage.getItem("user_id");

const ME=gql`
query me($id:ID!){
  user(id:$id){
    name,email,contact_no,avatar
    posts{
      title,content,comment{
        comment
        by{
          name
        }
      }
    }
  
  }
}
`;

export default function Account() {
  const {loading,error,data}=useQuery(ME,{variables:{id:id}});
  const navigate=useNavigate();
  const[file,setFile]=useState('');
  if (loading) return <p>Loading...</p>;
  if(error) console.log(error);

function editUser()
{
  navigate('/profile/edit')
}
async function uploadImage()
{
  const Data = new FormData();
//   if(!file)
//   {
//     Swal.fire({
//       position: 'center',
//       icon: 'error',
//       title: 'Image is not selected',
//       showConfirmButton: false,
//       timer: 2000
//     })
//   }
//   else if (! /\.(jpe?g|png|gif|bmp)$/i.test(file) ) {
//     Swal.fire({
//       position: 'center',
//       icon: 'error',
//       title: 'Invalid file format selected',
//       text:"Only supports jpg,jpeg or png image.",
//       showConfirmButton: false,
//       timer: 3000
//     })
// }
// else{
 
  Data.append(
      "operations",
      `{"query" :" mutation FileUpload($file:Upload!,$id:ID!){updateUserAvatar(avatar:$file,id:$id){name,avatar}}","variables": {"id":${id}}}`
    );
    Data.append("map", '{"0":["variables.file"]}');
    Data.append("0", file);
  
   console.log(file,Data)
   let result=await fetch("http://localhost:8000/graphql",{
      method:'POST',
    body:Data});

}




  return (
    <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                      <div className="wrapper">
                        {console.log(data.user.avatar)}
                      <img
                      src=  {data.user.avatar?
                         `http://localhost:8000/${data.user.avatar}`
                         : 
                         userlogo
                        }

                                            alt="Generic placeholder image"
                      className="img-fluid img-thumbnail rounded-circle mt-4 mb-2"
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  <input type="file" onChange={(e)=>setFile(e.target.files[0])} onBlur={(e)=>uploadImage()} />
                </div>
                   
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: "1" }}
                      onClick={(e)=>editUser()}
                    >
                      Edit profile <FontAwesomeIcon icon={faUserPen} />
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>{data.user.name}</h5>
               
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                ></div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Contact</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p className="font-italic mb-1">{data.user.contact_no}</p>
                      <p className="font-italic mb-0">{data.user.email}</p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1 headings" >Posts </p>
                   {
                      data.user.posts.map(post=>(
                        
                        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }} key={post.id}>
                        <p className="font-italic mb-1 text-success">{post.title}</p>
                       <p className="font-italic mb-1">{post.content}</p>  
                          
                      <div>
                      {
                          post.comment.map(comments=>(
                             <div  className=" p-4" style={{ backgroundColor: "#f8f9fa" }} key={comments.id}>
                              <FontAwesomeIcon style={{color:"#3b5998"}} icon={faComment}/> <br />
                              <b>abhishek</b>
                             <p className="font-italic text-muted mb-1">{comments.comment}</p>
                             {/* <p className="font-italic mb-1">{comments.by.name}</p> */}
                             </div>
                            
                          ))
                       }
                      </div>
                        
                      </div>
                      ))
                    } 
                
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
