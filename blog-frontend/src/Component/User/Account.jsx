import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useMutation,useQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import userlogo from "./user.png";
import Swal from "sweetalert2";
const id=localStorage.getItem("user_id");

const UPLOAD=gql`
mutation me($id:ID!,$avatar:String){
  updateUser(input:{id:$id,avatar:$avatar}){
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
const DEL_USER=gql`
mutation del_user($id:ID!)
{
  deleteUser(id:$id)
  {
    id
  }
}
`;
const ME=gql`query me($id:ID!){user(id:$id){
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
}}`;
export default function Account() {
  let users = JSON.parse(localStorage.getItem("users"));
  const { loading, error, data } = useQuery(ME,{variables:{id:id}});
   const[ updateImg]=useMutation(UPLOAD,{errorPolicy:"all"});
   const[ delUser]=useMutation(DEL_USER);
   //const user=JSON.parse(localStorage.getItem('user'));
  const navigate=useNavigate();
  const[file,setFile]=useState('');
   if (loading) return <p>Loading...</p>;
   if(error) console.log(error);
   if(data)
   {
    console.log(data)
   }
  const AccountDelete=()=>{
    Swal.fire({
      title: 'Are you sure?',
    text: "Don't you wanna stay longer?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'No, Remove the Account😞',
    cancelButtonText: 'Yes I want to stay 🥰',
  
  }).then((result) => {
    if (result.isConfirmed) {
      delUser({variables:{id:id}});
  
      Swal.fire(
        'REMOVED!',
        'It was a good journey with you.🥲',
        'success'
      )
      localStorage.clear();
      navigate('/login')
      
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you 😍',
        text: 'Stay safe keep blogging',
        showConfirmButton: false,
        timer: 3000
      })
      navigate('/profile')
    }
  })
   
    
  }
function editUser()
{
  navigate('/profile/edit')
}
async function uploadImage()
{
  const Data = new FormData(); 
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
    result =await result.json();
    updateImg({variables:{id:id,avatar:result.data.updateUserAvatar.avatar}})
    .then((res)=>{
      localStorage.setItem("user",JSON.stringify(res.data.updateUser))
    })
    navigate('/profile')
 
 

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
                      <img
                      src=  {data.user.avatar?
                         `http://localhost:8000/${data.user.avatar}`
                         : 
                         userlogo
                        }
                        alt="Generic placeholder image"
                      className=" img-prompt img-fluid img-thumbnail rounded-circle mt-4 mb-2"
                      style={{ width: "150px",height:"150px", zIndex: "1" }}
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
                        {
                          post.file_path?
                          <img
                          src=  {
                             `http://localhost:8000/${post.file_path}`
                             
                            }
                            alt="Generic placeholder image"
                          className=" img-prompt img-fluid img-thumbnail  mt-4 mb-2"
                          style={{ width: "100px",height:"100px", zIndex: "1" }}
                        />:null
                        }
                       <p className="font-italic mb-1">{post.content}</p>  
                          
                      <div>
                      {
                          post.comment.map(comments=>(
                             <div  className=" p-4" style={{ backgroundColor: "#f8f9fa" }} key={comments.id}>
                              <FontAwesomeIcon style={{color:"#3b5998"}} icon={faComment}/> 
                             &nbsp; <span style={{color: "#3b5998",fontWeight:"bold" }}>
                              {
                                users.map(all=>all.id===comments.user_id?all.name:null)
                              }
                              </span>                           
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
                  <button onClick={(e)=>{AccountDelete()}} className="btn btn-outline-danger justify-content-end" style={{top:'00px'}} type="button">
                      Delete Account
                    </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
