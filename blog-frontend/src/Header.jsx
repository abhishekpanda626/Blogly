import Container from "react-bootstrap/Container";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { Nav } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faPenToSquare, faUserGraduate, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUser,faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import userlogo from "./Component/User/user.png";
let id=localStorage.getItem("user_id");

const USERS=gql`
query all_user{
  users{
  id name gender avatar email contact_no posts{
    id,title,content,file_path,user_id comment{
      id,user_id,post_id,comment,file_path
    }
  }
}
}
`;

export default function Header() {
  let user=JSON.parse(localStorage.getItem('user'));
  const {loading,error,data}=useQuery(USERS);
 
  if(error)
  console.log(error)
  if(data)
  {
    localStorage.setItem("users",JSON.stringify(data.users));
  }
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));

  const navigate=useNavigate();
  const token=localStorage.getItem("access-token");

  const logOutHandler=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
      <Navbar sticky="top" style={{ background: "#3b5998" }} variant="dark">
        <Container fluid="xxl">
          <Navbar.Brand href="#home">
            
            <FontAwesomeIcon icon={faBlog} />
            Blogly
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link href="/">
           
            <FontAwesomeIcon
              inverse
              transform="grow-2 right-5"
              icon={faHouse}
            />
          </Nav.Link >
      
          {
            token?
            <Nav.Link href="/post/show">
            <FontAwesomeIcon
            inverse
            style={{color:"white", marginTop:'7px'}}
            transform=" grow-8 right-180"
            icon={faPenToSquare}
          />
          
          </Nav.Link>
          :null

          }
          
          <Navbar.Collapse className="justify-content-end">
  {
    token?
    
   
    <Dropdown drop="start">
 <Dropdown.Toggle  variant="muted" as={CustomToggle}>
 <img src=  {user.avatar?
                         `http://localhost:8000/${user.avatar}`
                         : 
                         userlogo
                        } 
 
 width={43} height={39} className="rounded-circle"  />
 </Dropdown.Toggle>

 <Dropdown.Menu  >
   <Dropdown.Item href="/profile">  
   <FontAwesomeIcon icon={faUserTie} />
         &nbsp; Account
        </Dropdown.Item>
   <Dropdown.Item onClick={(e)=>logOutHandler()}> <FontAwesomeIcon icon={faRightFromBracket} />
   &nbsp; Logout</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
  :
  null
  }
  </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
