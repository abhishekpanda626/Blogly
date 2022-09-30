
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { json, useNavigate } from 'react-router-dom';
import { useQuery,useMutation,gql } from '@apollo/client';
import ShowComment from './ShowComment';

let post=JSON.parse(localStorage.getItem("post"))
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

let valcomment;
export default function EditComment()
{

    const [show, setShow] = useState(true);
    const navigate=useNavigate();
    const cid=localStorage.getItem("comment_id")
    const handleClose = () => {setShow(false); navigate('/comment/show')};
   
   
    const[editCmt]=useMutation(EDIT_CMT,{errorPolicy:"all"},);
     
const {loading,error,data}=useQuery(SHOW_CMT,{variables:{id:cid}});
const[editComment,setEditComment]=useState('');
const[comment,showComment]=useState('');

useEffect(()=>{
  if(data)
  {
    showComment(data.comment.comment);
 
  }
})




 function handleEdit()
{
//  e.preventDefault();
  console.log(editComment)
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
                defaultValue={comment}
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
          <Button variant="primary" onClick={(e)=>handleEdit(e)}>
            Edit Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
