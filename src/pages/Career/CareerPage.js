import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCareers } from '../../services/careerService';

// import '../Career/CSS/CareerPage.css'; // Assuming you have a CSS file to style the page
import '../Career/CSS/CareerPage.css'; // Correct the casing here

import TopMenu from '../../core/TopMenu';
import Footer from '../../core/footer';

const CareerPage = () => {
    const [careers, setCareers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllCareers()
            .then((data) => {
                setCareers(data);
            })
            .catch((error) => {
                console.error('Error fetching careers:', error);
            });
    }, []);

    const filteredCareers = careers.filter((career) =>
        career.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="career-page">
            {/* Top Menu */}
            <TopMenu />

            <div className="career-content">
                <h2 className="career-heading">Job Openings</h2>
                <input
                    type="text"
                    placeholder="Search for a job..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="career-search-input"
                />
                <div className="career-list">
                    {filteredCareers.map((career) => (
                        <div key={career._id} className="career-item">
                            <h3 className="career-title">{career.title}</h3>
                            <p className="career-description">{career.description}</p>
                            <p className="career-location"><strong>Location:</strong> {career.location}</p>
                            <Link to={`/applyCareer/${career._id}`} className="apply-button">
                                Apply Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CareerPage;
