
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useQuery,useMutation,gql } from '@apollo/client';

const SHOW_POST=gql`
query mypost($id:ID!)
{
  post(id:$id)
  {
    id
    title
    content
    file_path
    
    
  }
}
`;
const EDIT_POST=gql`
mutation editPost($id:ID!,$title:String,$content:String,$file_path:String)
{
  updatePost(id:$id,title:$title,content:$content,file_path:$file_path)
  {
    
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
        file_path
      }
    
  }
  }
`;

let valtitle,valcontent,valfile;
export default function EditPost()
{
  const Data=new FormData();
    const [show, setShow] = useState(true);
    const navigate=useNavigate();
    const post=JSON.parse(localStorage.getItem("post"))
    const handleClose = () => {setShow(false); navigate('/comment/show')};
    const handleShow = () => setShow(true);
    const {loading,error,data}=useQuery(SHOW_POST,{variables:{id:post.id}});
    const[editPost,{nloading,nerror,ndata}]=useMutation(EDIT_POST,{errorPolicy:"all"});
    const[editTitle,setTitle]=useState('');
    const[editContent,setContent]=useState('');
    const[file,setFile]=useState('');
 if(data)
 {
     valtitle=data.post.title;
     valcontent=data.post.content;
     valfile=data.post.file_path;
     
 }

 async function handleEdit()
 {

  if(file)
  {
    Data.append(
      "operations",
      `{"query" :" mutation FileUpload($file:Upload!,$id:ID!){uploadPost(file_path:$file,id:$id){id,file_path}}","variables": {"id":${post.id}}}`
    );
    Data.append("map", '{"0":["variables.file"]}');
    Data.append("0", file);
   let result=await fetch("http://localhost:8000/graphql",{
      method:'POST',
    body:Data});
    result= await result.json();
    
    console.log(result.uploadPost.file_path)
    editPost({variables:{id:result.uploadPost.id,file_path:result.uploadPost.file_path}})
    .then((res)=>localStorage.setItem("post",JSON.stringify(res.data.updatePost)));
  }

  editPost({variables:{id:post.id,title:editTitle,content:editContent}})
   .then((res)=>localStorage.setItem("post",JSON.stringify(res.data.updatePost)));
navigate('/post/show');
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
                onMouseOver={(e)=>setTitle(valtitle)}
                autoFocus
                onChange={(e)=>setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" defaultValue={valcontent} onMouseOver={(e)=>setContent(valcontent)} onChange={(e)=>setContent(e.target.value)} rows={3} />
              <div className="wrapper">
                     { valfile? <img
                      src=  {
                         `http://localhost:8000/${valfile}`
                        }
                        alt="Generic placeholder image"
                      className=" img-prompt img-fluid img-thumbnail rounded-circle mt-4 mb-2"
                      style={{ width: "150px",height:"150px", zIndex: "1" }}
                    />:null}
                  <input type="file" onChange={(e)=>setFile(e.target.files[0])}  />
                </div>
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
