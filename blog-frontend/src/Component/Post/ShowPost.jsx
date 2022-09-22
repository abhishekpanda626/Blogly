import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from '@fortawesome/free-solid-svg-icons';
import { useQuery, gql } from '@apollo/client';
const POSTS = gql`
query  get__posts{
       posts{
        title
        content
        author{
           name
           email
        }
    }
   }
`;

export default function ShowPost()
{
 

    const {loading,error,data}=useQuery(POSTS);
    if (loading) return <p>Loading...</p>;
     if(error) console.log(error);
     console.log(data);

 


    function clickHandler()
    {
        alert("Clicked")
    }
    return(
        <>
    
        <div className='x-container'>
            <table>
                <tr>
                <th >author</th>
                </tr>
                <tr>
                <td></td>
                    <th>Title</th>
                </tr>
                <tr>
                    
                <td></td>
                    <td>
                        <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80"  
                        height={80} width={100}
                        />
                    </td>
                </tr>
                <tr>
                <td>
                        Body
                    </td>
                </tr>
                <tr>
                <td></td>
                    <th> <div className="card"><FontAwesomeIcon icon={faComments} onClick={clickHandler} /></div></th>
                   
                </tr>
            </table>
        </div>
        </>
    )
}