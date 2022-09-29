import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCamera,
  faXmark,
  faEllipsisVertical,
  faPenToSquare,
  faEdit,
  faPen,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const COMMENTS = gql`
  mutation send($comment: String!, $uid: ID!, $pid: ID!) {
    createComment(input: { comment: $comment, user_id: $uid, post_id: $pid }) {
      post {
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
  }
`;
const DELETE_COMMENT = gql`
  mutation del($id: ID!) {
    deleteComment(id: $id) {
      id
      post {
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
  }
`;
const DELETE_POST = gql`
  mutation delPost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
export default function ShowComment() {
  const Data = new FormData();
  const [send, { loading, error, data }] = useMutation(COMMENTS, {
    errorPolicy: "all",
  });
  const [del] = useMutation(DELETE_COMMENT);
let users=JSON.parse(localStorage.getItem("users"));
  const [delPost] = useMutation(DELETE_POST);
  let post = JSON.parse(localStorage.getItem("post"));
  let uid = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(true);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("post");

    navigate("/post/show");
  };
  const handleShow = () => setShow(true);

  const commentHandler = () => {
    send({ variables: { comment: comment, uid: uid, pid: post.id } }).then(
      (res) => {
        let cid = res.data.createComment.id;
        console.log(cid);
        Data.append(
          "operations",
          `{"query" :" mutation FileUpload($file:Upload!,$id:ID!){uploadComment(file_path:$file,id:$id){title,file_path}}","variables": {"id":${cid}}}`
        );
        Data.append("map", '{"0":["variables.file"]}');
        Data.append("0", image);
        console.log(image, Data);
        fetch("http://localhost:8000/graphql", {
          method: "POST",
          body: Data,
        });
        localStorage.setItem(
          "post",
          JSON.stringify(res.data.createComment.post)
        );
      }
    );
    navigate("/comment/show");
  };
  function deleteComment(cid) {
    del({ variables: { id: cid } }).then((res) =>
      localStorage.setItem("post", JSON.stringify(res.data.deleteComment.post))
    );
    navigate("/comment/show");
  }
  function DeletePost() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        delPost({ variables: { id: post.id } });

        Swal.fire("REMOVED!", "Your post has been removed..", "success");
        navigate("/post/show");
      } else {
        Swal.fire(
          "Safe",
          "Your post is safe.Why not add a new one.",
          "success"
        );
      }
    });

    navigate("/post/show");
  }

  function editComment(cid) {
    localStorage.setItem("comment_id", cid);
    navigate("/comment/edit");
  }

  return (
    <>
      <Modal
        className="modal-div"
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        size="xxl"
      >
              <Modal.Header closeButton>
        {
          users.map(all=>(
            all.id===post.user_id?
            <>
      
          <img
            src={`http://localhost:8000/${all.avatar}`}
            className="rounded-circle"
            height={35}
            width={40}
            alt="not found"
          />
          <b style={{ color: "#3b5998", marginRight: "10PX" }}>{all.name} </b>
            </>:null
          ))
        }
          {uid === post.user_id ? (
            <Dropdown>
              <Dropdown.Toggle variant="muted" as={CustomToggle}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Dropdown.Toggle>

              <Dropdown.Menu size="sm" title="">
                <Dropdown.Item href="/post/edit">
                  Edit
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ left: "50" }}
                  />{" "}
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => DeletePost()}>
                  Remove{" "}
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="1x"
                    style={{ left: "50", color: "red" }}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : null}
        </Modal.Header>
        <Modal.Body>
          <div className="container ">
            <div className="card custom-card border-0 justify-content-center align-items-center ">
              <img
                className="card-img-top"
                src={`http://localhost:8000/${post.file_path}`}
                alt="Card image cap"
                style={{ height: "100%", width: "100%" }}
              />
              <div className="card-body">
                <div className="card-title h1">{post.title}</div>
                <p className="card-text">{post.content}</p>
              </div>
            </div>
            <table className="table">
              {post.comment
                ? post.comment.map((comments) => (
                    <tr key={comments.id}>
                      {
                        users.map(all=>(
                          all.id===comments.user_id?
                          <>

                        <td style={{color:"#3b5998"}}>{all.name}</td>
                          </>:null
                        ))
                      }
                      <td>{comments.comment}</td>

                      <td>
                        {post.user_id === uid || comments.user_id === uid ? (
                          <button
                            className="icon-delete"
                            onClick={(e) => {
                              deleteComment(comments.id);
                            }}
                          >
                            <FontAwesomeIcon
                              className="text-danger"
                              icon={faXmark}
                            />
                          </button>
                        ) : null}
                        {comments.user_id === uid ? (
                          <button
                            className="edit-btn"
                            onClick={(e) => editComment(comments.id)}
                          >
                            {" "}
                            <FontAwesomeIcon
                              icon={faPen}
                              color="#1369ce"
                            />{" "}
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))
                : null}
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="comment_div">
            <input
              className="comment_input"
              placeholder="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
              type="text"
            />{" "}
            <button
              className="bg-muted border-0"
              type="button"
              onClick={(e) => commentHandler(e)}
            >
              {" "}
              <FontAwesomeIcon className="icon-comment" icon={faPaperPlane} />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
