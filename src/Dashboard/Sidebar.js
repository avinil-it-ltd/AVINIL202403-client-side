import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaTachometerAlt, FaImage, FaUserEdit, FaPlusCircle, FaListAlt, FaBriefcase, FaQuestionCircle } from 'react-icons/fa';

import './css/dashboard.css';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column sidebar">
            <Nav className="flex-column p-3">
                <Nav.Link as={Link} to="/dashboard" className="mb-2">
                    <FaTachometerAlt /> Overall Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/categories" className="mb-2">
                    <FaPlusCircle /> Categories
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/addProject" className="mb-2">
                    <FaPlusCircle /> Add New Project
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/projects" className="mb-2">
                    <FaListAlt /> View Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/changeImage" className="mb-2">
                    <FaImage /> Change Image
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/changeCredentials" className="mb-2">
                    <FaUserEdit /> Change Email/Password
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/UpdateAboutDetails" className="mb-2">
                    <FaUserEdit /> Change About Details
                </Nav.Link>

                <h5 className="mt-4">Contact Management</h5>
                <Nav.Link as={Link} to="/dashboard/contactDashboard" className="mb-2">
                    <FaBriefcase /> View Contact Leads
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/UpdateContactDetails" className="mb-2">
                    <FaBriefcase /> Change Contact Details
                </Nav.Link>

                <h5 className="mt-4">Career Management</h5>
                <Nav.Link as={Link} to="/dashboard/careers" className="mb-2">
                    <FaBriefcase /> View Careers
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/dashboard/addCareer" className="mb-2">
                    <FaPlusCircle /> Add New Career
                </Nav.Link> */}

                <h5 className="mt-4">Applications Management</h5>
                <Nav.Link as={Link} to="/dashboard/applications" className="mb-2">
                    <FaClipboardList /> View Applications
                </Nav.Link>


                <h5 className="mt-4">FAQ Management</h5>
                <Nav.Link as={Link} to="/dashboard/faqDashboard" className="mb-2">
                    <FaQuestionCircle /> Manage FAQs
                </Nav.Link>

                <h5 className="mt-4">Testimonial Management</h5> {/* New section for testimonials */}
                <Nav.Link as={Link} to="/dashboard/testimonialDashboard" className="mb-2">
                    <FaClipboardList /> Manage Testimonials
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
