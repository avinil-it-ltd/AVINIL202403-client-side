import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCareers } from '../../services/careerService';
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
        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
            {/* Top Menu */}
            <TopMenu />

            <div className="container my-5">
                <h2 className="text-center mb-4">Job Openings</h2>

                {/* Search Input */}
                <div className="input-group mb-4 w-50 mx-auto">
                    <input
                        type="text"
                        placeholder="Search for a job..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                        aria-label="Search for a job"
                    />
                    <button className="btn btn-primary" type="button">Search</button>
                </div>

                {/* Career List */}
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {filteredCareers.map((career) => (
                        <div key={career._id} className="col">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{career.title}</h5>
                                    <p className="card-text">{career.description}</p>
                                    <p className="card-text"><strong>Location:</strong> {career.location}</p>
                                    <Link to={`/applyCareer/${career._id}`} className="btn btn-primary w-100 mt-2">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message if no jobs are found */}
                {filteredCareers.length === 0 && (
                    <div className="text-center mt-5">
                        <h5>No job openings found. Please check back later!</h5>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CareerPage;
