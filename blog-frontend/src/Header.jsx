import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { Nav } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate=useNavigate();
  const token=localStorage.getItem("access-token");
  const UserMenu = (
    <Image
      src={"https://github.com/mshaaban0.png"}
      alt="UserName profile image"
      roundedCircle
      style={{ width: "35px" }}
    />
  );
  const logOutHandler=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
      <Navbar sticky="top" style={{ background: "#3b5998" }} variant="dark">
        <Container fluid="xxl">
          <Navbar.Brand href="#home">
            {" "}
            <FontAwesomeIcon icon={faBlog} />
            Blogly
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link href="/">
            {" "}
            <FontAwesomeIcon
              inverse
              transform="grow-2 right-5"
              icon={faHouse}
            />{" "}
          </Nav.Link>
          <Navbar.Collapse className="justify-content-end">
  {
    token?
    
   
    <NavDropdown
      title={UserMenu}
      // menuVariant="dark"
      bg="muted"
      drop="start"
    >
      <NavDropdown.Item href="/profile">
        {" "}
        <FontAwesomeIcon icon={faUserTie} />
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item onClick={logOutHandler}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        logout
      </NavDropdown.Item>
    </NavDropdown>

  :
  null
  }
  </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
