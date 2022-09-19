import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function Header() {


  return (
    <Navbar sticky="top" bg="success"  variant="dark" expand="lg">
      <Container fluid="xl">
        <Navbar.Brand >  <FontAwesomeIcon  />Blogly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">          
                 <Nav.Link href='/'>Home</Nav.Link>
        
           </Nav>
           </Navbar.Collapse >
          
<Navbar.Collapse className="justify-content-end text-white" >
<FontAwesomeIcon icon={faUser} />&nbsp;
              
<NavDropdown title="" id="basic-nav-dropdown">             
              <NavDropdown.Item href="/student/profile">Dashboard</NavDropdown.Item>
              <NavDropdown.Item >
                Logout <FontAwesomeIcon icon={faRightFromBracket} />
              </NavDropdown.Item>
            </NavDropdown>
            
        </Navbar.Collapse>
       </Container>
    </Navbar>
  );
}