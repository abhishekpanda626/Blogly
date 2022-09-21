import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faCamera,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import ShowPost from "./ShowPost";
import Profile from "../User/Profile";
export default function AddPost() {
  const Avatar = (
    <Image
      src={"https://github.com/mshaaban0.png"}
      alt="UserName profile image"
      roundedCircle
      style={{ width: "25px" }}
    />
  );
  return (
    <>
      <div className="container-fluid h-100 d-inline-block">
        <div className="row d-xl-flex">
          <div className="col-sm-3 mt-5 ">
            <div className="headings">Posts</div>
            <ShowPost />
          </div>
          <div className="col-md-5 m-5 ">
            <form action="" className="form-group">
              <span className="post-avatar">{Avatar} Samwell Tarly</span>
              <div className="post_text">
                <FontAwesomeIcon icon={faPenToSquare} />
                <input
                  type="text"
                  id="title"
                  placeholder="What's the status today?"
                />
                <div class="wrapper">
                  <FontAwesomeIcon className="upload" icon={faCamera} />
                  <input type="file" />
                </div>
              </div>
              <div className="post_text">
                <textarea className="form-control" id="body"></textarea>
              </div>
              <div>
                <button className="btn-post">Post</button>
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
