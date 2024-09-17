import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaImage, FaUserEdit } from 'react-icons/fa';
import Footer from '../core/footer';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/dashboard">
                    <FaTachometerAlt /> Overall Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/updateProject">
                    <FaTachometerAlt /> Update Project Details
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/changeImage">
                    <FaImage /> Change Image
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/changeCredentials">
                    <FaUserEdit /> Change Email/Password
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
