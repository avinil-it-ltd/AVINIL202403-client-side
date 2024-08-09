import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { Navbar, Container, Form, Nav, NavDropdown, FormControl, Button } from "react-bootstrap"
import logo from '../assets/images/logo.png'

import '../custom.css'

const TopMenu = () => {

  const theme = '#191919'


  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  }
  const hideDropdown = e => {
    setShow(false);
  }

  

  const topNav = () => (
    <div>
      <Navbar bg="" expand="lg" variant="dark" fixed="top" style={{ opacity: "0.9" }} className="shadow-lg nav_bar p-0">
        <Container fluid>
          <Navbar.Brand href="/" className="" >
            <div className="ms-4" style={{ width: "200px" }}  >
              <img src={logo} className="ms-5 " alt="" width="50px" height="40px" style={{ borderRadius: "", margin: "", padding: "" }} />
              <p className="fs-6 ms-3">3p Communication</p>
            </div>

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="text-warning me-3 flex-wrap border-0" style={{ fontSize: "0.8em" }} />
          <Navbar.Collapse id="navbarScroll" className="" >
            <Nav
              className="me-2 mx-auto my-2 my-lg-0 d-flex"
              style={{ padding: '7px' }}
              navbarScroll
            >
              <Nav.Link href="/" className="text-warning"> <p className="navbar_text_color  " >Home</p></Nav.Link>

              {/* <NavDropdown title={ <span className="text-warning">Services</span> }
                                id="collasible-nav-dropdown"
                                menuVariant="dark"
                                show={show}
                                onMouseEnter={showDropdown} 
                                onMouseLeave={hideDropdown}>
                    <NavDropdown.Item href="/architecture">Architecrure</NavDropdown.Item>
                    <NavDropdown.Item href="/design">Design</NavDropdown.Item>
                    <NavDropdown.Item href="/interior">Interior</NavDropdown.Item>
                  </NavDropdown> */}

              <Nav.Link href="/aboutUs" ><p className="navbar_text_color  " >About Us</p></Nav.Link>
              <Nav.Link href="/interior" > <p className="navbar_text_color  " >Interior</p></Nav.Link>
              <Nav.Link href="/exterior" ><p className="navbar_text_color  " >Exterior </p></Nav.Link>
              <Nav.Link href="/event" ><p className="navbar_text_color  " >Event </p></Nav.Link>
              <Nav.Link href="/contactus" className="text-warning"><p className="navbar_text_color  " > Contact Us </p></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
 
  return (
    <div>
      <div>{topNav()}</div>
      <br /><br /><br />
      {/*<div style={{backgroundColor:theme,opacity:"0.9"}}>{mobSearch()}</div>*/}

    </div>
  )
}

export default TopMenu;

