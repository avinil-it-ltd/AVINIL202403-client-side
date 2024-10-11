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
                console.log(data);
                
                setCareers(data);
            })
            .catch((error) => {
                console.error('Error fetching careers:', error);
            });
    }, []);

    // const filteredCareers = careers.filter((career) =>
    //     career.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredCareers = careers.filter(
        (career) =>
            career.status && // Check if the career is active
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
                    <button className="btn btn-primary" type="button">
                        Search
                    </button>
                </div>

                {/* Career Table */}
                {filteredCareers.length > 0 ? (
                    <table className="table table-striped table-bordered text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>Job Title</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCareers.map((career) => (
                                <tr key={career._id}>
                                    <td>{career.title}</td>
                                    <td>{career.description}</td>
                                    <td>{career.location}</td>
                                    <td>
                                        <Link to={`/applyCareer/${career._id}`} className="btn btn-success">
                                            Apply Now
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
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