import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaImage, FaUserEdit, FaPlusCircle, FaListAlt, FaBriefcase } from 'react-icons/fa';
import Footer from '../core/footer';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/dashboard">
                    <FaTachometerAlt /> Overall Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/addProject">
                    <FaPlusCircle /> Add New Project
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/projects">
                    <FaListAlt /> View Projects
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

                 {/* Career Management Links */}
                 <Nav.Link as={Link} to="/dashboard/careers">
                    <FaBriefcase /> View Careers
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/addCareer">
                    <FaPlusCircle /> Add New Career
                </Nav.Link>
            </Nav>
            
        </div>
    );
};

export default Sidebar;
