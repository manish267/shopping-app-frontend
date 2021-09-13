import React, { useContext } from "react";
import { Navbar, Container, Nav,Badge } from "react-bootstrap";
import "./Header.css";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../store/user-context";
import {FaShoppingCart} from 'react-icons/fa';


function Header() {
  const currentUser = useContext(UserContext);
  console.log(currentUser);

  const { isLoggedIn, getLoggedIn,cartLength } = currentUser;

  const history = useHistory();

  async function userLogoutHandler() {
    await axios.get("/logout");
    getLoggedIn();
    history.push("/login");
  }

  return (
    <Navbar
      fixed="top"
      className="navbar"
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/allproducts">
              <Nav.Link className="nav-link">Products</Nav.Link>
            </LinkContainer>

            {
                isLoggedIn===true &&  <LinkContainer to="/products/new">
              <Nav.Link className="nav-link">New</Nav.Link>
            </LinkContainer>
            }
           
          </Nav>
          <Nav>

          {isLoggedIn!==true && <><LinkContainer to="/login">
              <Nav.Link className="nav-link">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link className="nav-link">SignUp</Nav.Link>
            </LinkContainer>
            </>
            }
            
            {isLoggedIn===true &&  
            <>
            <LinkContainer to="/cart">
            <Nav.Link className="nav-link" >
              <FaShoppingCart/> 
              <sup><Badge bg="danger" style={{backgroundColor:'red'}}>{cartLength}</Badge></sup>
            </Nav.Link>
          </LinkContainer>
            <Nav.Link onClick={userLogoutHandler} className="nav-link">
              Logout
            </Nav.Link>
            </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
