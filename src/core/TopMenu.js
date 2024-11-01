import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/images/logo.png';

import '../custom.css';

const TopMenu = () => {
    const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login state from localStorage on component mount
    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
        setIsLoggedIn(false); // Update the state
        navigate('/'); // Redirect to the login page
    };

    const topNav = () => (
        <div>
            <Navbar bg="" expand="lg" variant="dark" fixed="top" style={{ opacity: "0.9" }} className="shadow-lg nav_bar  p-0">
                <Container fluid>
                    <Navbar.Brand href="/" className="">
                        <div className="ms-4" style={{ width: "200px" }}>
                            <img src={logo} className="ms-5" alt="" width="50px" height="40px" />
                            <p className="fs-6 ms-3 navbar_text_color ">3P Communication</p>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className=" me-3 flex-wrap bg-warning border-0" style={{ fontSize: "0.8em" }} />
                    <Navbar.Collapse id="navbarScroll" className="ps-4">
                        <Nav className="me-2 mx-auto my-2 my-lg-0 d-flex" style={{ padding: '7px' }} navbarScroll>
                            <Nav.Link href="/" className="text-warning"><p className="navbar_text_color">Home</p></Nav.Link>
                            <Nav.Link href="/interior"><p className="navbar_text_color">Interior</p></Nav.Link>
                            <Nav.Link href="/exterior"><p className="navbar_text_color">Exterior</p></Nav.Link>
                            {/* <Nav.Link href="/event"><p className="navbar_text_color">Event</p></Nav.Link> */}
                            <Nav.Link href="/aboutUs"><p className="navbar_text_color">About Us</p></Nav.Link>
                            <Nav.Link href="/contactus" className="text-warning"><p className="navbar_text_color">Contact Us</p></Nav.Link>
                            <Nav.Link href="/careers"><p className="navbar_text_color">Career</p></Nav.Link> {/* Added Career Link */}

                            {isLoggedIn && (
                                <>
                                    <Nav.Link href="/dashboard"><p className="navbar_text_color">Dashboard</p></Nav.Link>
                                    <Nav.Link onClick={handleLogout}><p className="navbar_text_color">Logout</p></Nav.Link>
                                </>
                            ) }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );

    return (
        <div>
            <div>{topNav()}</div>
            <br /><br /><br />
        </div>
    );
};

export default TopMenu;
