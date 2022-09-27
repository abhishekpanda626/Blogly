
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useQuery,useMutation,gql } from '@apollo/client';
const post=JSON.parse(localStorage.getItem("post"))
const SHOW_POST=gql`
query mypost($id:ID!)
{
  post(id:$id)
  {
    id
    title
    content
    
  }
}
`;
const EDIT_POST=gql`
mutation editPost($id:ID!,$title:String,$content:String)
{
  updatePost(id:$id,title:$title,content:$content)
  {
    
      id
      title
      content
      user_id
      comment{
        id
        comment
        user_id
        post_id
      }
    
  }
  }
`;

let valtitle,valcontent;
export default function EditPost()
{
    const [show, setShow] = useState(true);
    const navigate=useNavigate();
    const handleClose = () => {setShow(false); navigate('/comment/show')};
    const handleShow = () => setShow(true);
    const {loading,error,data}=useQuery(SHOW_POST,{variables:{id:post.id}});
    const[editPost,{nloading,nerror,ndata}]=useMutation(EDIT_POST,{errorPolicy:"all"});
    const[editTitle,setTitle]=useState('');
    const[editContent,setContent]=useState('');

 if(data)
 {
     valtitle=data.post.title;
     valcontent=data.post.content;
    
 }

 const handleEdit=()=>
 {
    if(!editContent)
    {
        setContent(data.post.content)
    }
 if(!editTitle)
    {
        setTitle(data.post.title)
    }
    console.log(editTitle,editContent)
  editPost({variables:{id:post.id,title:editTitle,content:editContent}})
   .then((res)=>localStorage.setItem("post",JSON.stringify(res.data.updatePost)));
  navigate('/comment/show');
}

    return (
    <>
      <Modal className='modal-div' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={valtitle}
                autoFocus
                onChange={(e)=>setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" defaultValue={valcontent}  onChange={(e)=>setContent(e.target.value)} rows={3} />
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
