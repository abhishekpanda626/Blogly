import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from '@fortawesome/free-solid-svg-icons';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AddComment from '../Comment/AddComment';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { click } from '@testing-library/user-event/dist/click';
import ShowComment from '../Comment/ShowComment';
const POSTS = gql`

query  get__posts{
       posts{
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

export default function ShowPost()
{
    const navigate=useNavigate();

    const {loading,error,data}=useQuery(POSTS);
    if (loading) return <p>Loading...</p>;
     if(error) console.log(error);
     console.log(data);
    return(
        <>
    
        <div className='x-container '>
        <div >{
                data.posts.map(uposts=>(
                    <div className='card custom-card border-0 justify-content-center align-items-center ' key={uposts.id}>
                            <img className="card-img-top" src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80"
                             alt="Card image cap" style={{height:"50%",width:"50%"}} />
                                 <div className="card-body">
                                  <h5 className="card-title">{uposts.title}</h5>

        <center><a href='/comment/show' onClick={(e=>localStorage.setItem("post",JSON.stringify(uposts)))} ><FontAwesomeIcon  icon={faComments}   /></a></center>
  </div>
                    
                </div>
                ))
            }
           </div>
            
        </div>
        </>
    )
}