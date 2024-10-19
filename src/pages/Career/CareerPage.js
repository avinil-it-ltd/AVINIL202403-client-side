import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCareers } from '../../services/careerService';
import TopMenu from '../../core/TopMenu';
import Footer from '../../core/footer';
// import CustomLoader from '../../components/CustomLoader'; // Import the custom loader component

const CareerPage = () => {
    const [careers, setCareers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Loading state


    // Custom Loader Component
    const Loader = () => (
        <div className="loader-container text-center mt-5">
            <div className="custom-loader"></div>
        </div>
    );


    useEffect(() => {
        getAllCareers()
            .then((data) => {
                setCareers(data);
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((error) => {
                console.error('Error fetching careers:', error);
                setLoading(false); // Stop loading in case of error
            });
    }, []);

    const filteredCareers = careers.filter(
        (career) =>
            career.status && // Check if the career is active
            career.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loader />; // Show the custom loader while data is being fetched
    }

    return (
        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
            {/* Top Menu */}
            <TopMenu />

            <div className="container my-5">
                {/* Search Input */}
                <div className="input-group mb-4 mt-5 d-flex justify-content-between">
                    <h2 className="mb-4">Job Openings</h2>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search for a job..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control py-0 my-0 "
                            aria-label="Search for a job"
                        />
                        <button className="btn btn-secondary text-white fw-bold px-4 ms-2" type="button">
                            Search
                        </button>
                    </div>
                </div>

                <hr />

                {/* Career Cards */}
                {filteredCareers.length > 0 ? (
                    <div className="row">
                        {filteredCareers.map((career) => (
                            <div key={career._id} className="col-12 my-4">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body shadow-sm p-4 d-flex justify-content-between align-items-center">
                                        <div className='w-100'>
                                            <h5 className="card-title fs-3 mb-4">{career.title}</h5>
                                            <div className="row my-2 w-full">

                                                {/* Left Column: Vacancy and Salary */}
                                                <div className="col-md-4 mb-2">
                                                    <p className="mb-1"><strong>Vacancy:</strong> {career.vacancy || 'Not specified'}</p>
                                                    <p className="mb-1"><strong>Experience:</strong> {career.experience || 'Not specified'}</p>
                                                </div>

                                                {/* center Column: Location and Experience */}
                                                <div className="col-md-4 mb-2">
                                                    <p className="mb-1"><strong>Location:</strong> {career.location}</p>
                                                    <p className="mb-1"><strong>Salary:</strong> {career.salary || 'Negotiable'}</p>
                                                </div>

                                                {/* right Column: Location and Experience */}
                                                <div className="col-md-4 mb-2 text-center">
                                                    <Link to={`/applyCareer/${career._id}`} className="btn btn-warning text-white  px-4">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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






