
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { json, useNavigate } from 'react-router-dom';
import { useQuery,useMutation,gql } from '@apollo/client';
const cid=localStorage.getItem("comment_id")
const SHOW_CMT=gql`
query mycomment($id:ID!)
{
  comment(id:$id)
  {
    id
    comment
    post{
      id
      title
      content
    }
  }
}
`;
const EDIT_CMT=gql`
mutation editComment($id:ID!,$comment:String)
{
  updateComment(id:$id,comment:$comment)
  {
    post{
      id
      title
      content
      user_id
      file_path
      comment{
        id
        comment
        user_id
        post_id
      }
    }
  }
  }
`;

var valcomment
export default function EditComment()
{
    const [show, setShow] = useState(true);
    const navigate=useNavigate();
    let post=JSON.parse(localStorage.getItem("post"))
    const handleClose = () => {setShow(false); navigate('/comment/show')};
    const handleShow = () => setShow(true);
    const {loading,error,data}=useQuery(SHOW_CMT,{variables:{id:cid}});
    const[editCmt]=useMutation(EDIT_CMT,{errorPolicy:"all"},);
    const[editComment,setEditComment]=useState('');
 if(data)
 {
  valcomment= data.comment.comment;
  
 }

 function handleEdit()
{
  editCmt({variables:{id:cid,comment:editComment}})
  .then((res)=>
  localStorage.setItem("post",JSON.stringify(res.data.updateComment.post))
  )
  ;
  navigate('/comment/show');
}

    return (
    <>
      <Modal className='modal-div' show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                defaultValue={valcomment}
                autoFocus
                onChange={(e)=>setEditComment(e.target.value)}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>{handleEdit()}}>
            Edit Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
