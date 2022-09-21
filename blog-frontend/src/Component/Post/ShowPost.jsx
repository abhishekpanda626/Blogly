import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from '@fortawesome/free-solid-svg-icons';
export default function ShowPost()
{
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