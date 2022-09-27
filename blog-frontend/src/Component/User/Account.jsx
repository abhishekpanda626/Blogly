import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
const id=localStorage.getItem("user_id");

const ME=gql`
query me($id:ID!){
  user(id:$id){
    name,email,contact_no,
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
  if (loading) return <p>Loading...</p>;
  if(error) console.log(error);

function editUser()
{
  navigate('/profile/edit')
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
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", zIndex: "1" }}
                    />
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
