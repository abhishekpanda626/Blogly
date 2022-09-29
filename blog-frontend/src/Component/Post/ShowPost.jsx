import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faEdit, faPencilSquare, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { click } from "@testing-library/user-event/dist/click";
import ShowComment from "../Comment/ShowComment";
const POSTS = gql`
  query get__posts {
    posts {
      id
      title
      content
      user_id
      file_path
      comment {
        id
        comment
        user_id
        post_id
        file_path
      }
    }
  }
`;

export default function ShowPost() {
  let users = JSON.parse(localStorage.getItem("users"));
  localStorage.removeItem("post");
  const { loading, error, data } = useQuery(POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) console.warn(error);
  return (
    <>
      <div className="container ">
        <div className="row">
            
        <div className="col-md">
            
        <div>
        <center>
                
                  <a href="/post/add" >
                  <button className="btn  btn-outline-primary">
                  Add New
                    <FontAwesomeIcon icon={faPencilSquare}   />
                    </button>
                  </a>
                  
</center>
          {data.posts.map((uposts) => (
            <div
              className="card custom-card border-0 justify-content-center align-items-center "
              key={uposts.id}
            >
              {uposts.file_path ? (
                <img
                  className="card-img-top"
                  src={`http://localhost:8000/${uposts.file_path}`}
                  alt="Card image cap"
                  style={{
                    height: "30%",
                    width: "30%",
                    border: "3px solid",
                    borderWidth: "10px",
                    color: "#3b5998",
                  }}
                />
              ) : null}

              <div className="card-body">
                <h5 className="card-title">
                  {users.map(all=>(

                    all.id===uposts.user_id?
                    <>
                     <span style={{ color: "#3b5998" }}>{all.name} &nbsp;  </span>
                     posted &nbsp;
                    </>:null

                  ))}
                  <span style={{ color: "#3b5998" }}>{uposts.title}</span>
                </h5>

                <center>
                  <a
                    href="/comment/show"
                    onClick={(e) =>
                      localStorage.setItem("post", JSON.stringify(uposts))
                    }
                  >
                    <FontAwesomeIcon icon={faComments} size="1x" />
                  </a>
                        </center>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      </div>
    </>
  );
}
