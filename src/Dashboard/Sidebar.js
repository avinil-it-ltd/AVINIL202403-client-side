import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaTachometerAlt, FaImage, FaUserEdit, FaPlusCircle, FaListAlt, FaBriefcase } from 'react-icons/fa';
import Footer from '../core/footer';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/dashboard" className="mb-2">
                    <FaTachometerAlt /> Overall Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/addProject" className="mb-2">
                    <FaPlusCircle /> Add New Project
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/projects" className="mb-2">
                    <FaListAlt /> View Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/updateProject" className="mb-2">
                    <FaTachometerAlt /> Update Project Details
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/changeImage" className="mb-2">
                    <FaImage /> Change Image
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/changeCredentials" className="mb-2">
                    <FaUserEdit /> Change Email/Password
                </Nav.Link>

                {/* Career Management Links */}
                <h5 className="mt-4">Career Management</h5>
                <Nav.Link as={Link} to="/dashboard/careers" className="mb-2">
                    <FaBriefcase /> View Careers
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/addCareer" className="mb-2">
                    <FaPlusCircle /> Add New Career
                </Nav.Link>
                {/* Applications Link for Admin */}
                <h5 className="mt-4">Applications Management</h5>
                <Nav.Link as={Link} to="/dashboard/applications" className="mb-2">
                    <FaClipboardList /> View Applications
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
