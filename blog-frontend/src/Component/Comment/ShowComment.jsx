import React, { useState, useEffect } from 'react';
import { Modal,Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faCamera, faXmark, faEdit, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
const COMMENTS=gql`
mutation send($comment:String!,$uid:ID!,$pid:ID!){
  createComment(input:{comment:$comment,user_id:$uid,post_id:$pid})
  {
    comment
  by{
    name
  }
  user_id
  post_id
  }
}
`;
const DELETE_COMMENT=gql`
mutation del($id:ID!){
  deleteComment(id:$id)
  {
    comment
  by{
    name
  }
  user_id
  post_id
  }
}`;
export default function ShowComment()
{
    const[send,{loading,error,data}]=useMutation(COMMENTS,{errorPolicy:"all"});
    const[del]=useMutation(DELETE_COMMENT);
    let post=JSON.parse(localStorage.getItem("post"));
    let uid=localStorage.getItem('user_id');
    const navigate=useNavigate();
    const [comment,setComment]=useState('');
    const [image,setImage]=useState('');
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        localStorage.removeItem("post");
        navigate('/post/add');
    }
    const handleShow = () => setShow(true);

const   commentHandler=()=>{
send({variables:{comment:comment,uid:uid,pid:post.id}})
navigate('/post/add')
}
function deleteComment(cid){
del({variables:{id:cid}});
navigate('/comment/show')

}

    return (
      <>
        <Modal className='modal-div' show={show} onHide={handleClose} backdrop="static" centered size="xxl">
          <Modal.Header closeButton>
         <img src="https://github.com/mshaaban0.png"
         className='rounded-circle' height={35} width={40}
         alt="not found" /> <b style={{color:"#3b5998",marginRight:"10PX"}}> Abhishek </b> 
          </Modal.Header>
          <Modal.Body>  
            <div className='container '>
                    <div className='card custom-card border-0 justify-content-center align-items-center ' >
                       
                            <img className="card-img-top" src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80"
                             alt="Card image cap" style={{height:"100%",width:"100%"}} />
                                 <div className="card-body">
                                   <div className="card-title h1">{post.title}</div>
        <p className="card-text">{post.content}</p>
  </div>       
                </div>
                <table className='table'> 
                {
                post.comment.map(comments=>(
                    
                        <tr key={comments.id}>
                            <td style={{color:"#3b5998"}}>author</td>
                            <td>{comments.comment}</td>
                            {
                             post.user_id===uid?
                             <td>
                             <><button className='icon-delete' onClick={(e)=>{deleteComment(comments.id)}}><FontAwesomeIcon className='text-danger' icon={faXmark}/></button></>
                            {/* {
                                comments.user_id===uid?
                                <><button className='icon-edit'><FontAwesomeIcon style={{color:"#3b5998"}} icon={faPenToSquare}/></button></>:
                                null
                            } */}
    
                             </td> 
                             :null
                            }
                        </tr>
                   

                ))
            }
             </table>
           
            
        </div></Modal.Body>
          <Modal.Footer>
          <div className="wrapper">
                  <FontAwesomeIcon className="upload icon-upload" icon={faCamera} />
                  <input type="file" />
                </div>
          <div className='comment_div' >
          <input className='comment_input'placeholder='Write a comment...' onChange={(e)=>setComment(e.target.value)} type="text"/> <button className='bg-muted border-0' type="button" onClick={(e)=>commentHandler(e)} > <FontAwesomeIcon className='icon-comment' icon={faPaperPlane}/></button>
          </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }