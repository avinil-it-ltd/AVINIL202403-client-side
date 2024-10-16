import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // New state variables for filtering
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/projects');
                if (isMounted) {
                    setProjects(response.data.projects || response.data);
                    setLoading(false); // Set loading to false after fetching data
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to fetch projects');
                    setLoading(false); // Set loading to false even on error
                }
            }
        };

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleShowDetails = (project) => {
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedProject(null);
    };

    const handleShowDelete = (project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
    };

    const handleCloseDelete = () => {
        setShowDeleteModal(false);
        setSelectedProject(null);
    };

    const handleDeleteProject = async () => {
        try {
            await axios.delete(`https://3pcommunicationsserver.vercel.app/api/projects/${selectedProject._id}`);
            setProjects(projects.filter((p) => p._id !== selectedProject._id));
            handleCloseDelete();
        } catch (err) {
            console.error('Failed to delete project:', err);
        }
    };

    const handleNavigateToUpdate = (project) => {
        navigate(`/dashboard/updateproject/${project._id}`);
    };

    // Filtering projects
    const filteredProjects = projects.filter(project => {
        const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
        const matchesSearch = project.title.toLowerCase().includes(searchText.toLowerCase()) ||
            project.client.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Custom Loader Component
    const Loader = () => (
        <div className="loader-container text-center mt-5">
            <div className="custom-loader"></div>
        </div>
    );

    if (loading) {
        return <Loader />; // Use custom loader here
    }

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5 p-4 mx-auto card w-75">
            <h2 className="text-center mb-4">Projects List</h2>

            {/* Search and Filter Section */}
            <div className="mb-4">
                <Form inline className="w-100">
                    <div className="d-flex justify-content-between w-100">
                        <Form.Group controlId="searchText" className="me-4" style={{ width: '50%' }}>
                            <div className="position-relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="rounded-pill border border-dark shadow-sm pr-5"
                                    style={{ borderColor: '#003366' }}
                                    aria-label="Search projects"
                                />
                                <i className="fas fa-search position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="categorySelect" style={{ width: '50%' }}>
                            <Form.Control
                                as="select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="rounded-pill border border-dark shadow-sm"
                                style={{ borderColor: '#003366' }}
                            >
                                <option value="">All Categories</option>
                                {Array.from(new Set(projects.map(project => project.category))).map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </Form>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="alert alert-info">No projects found.</div>
            ) : (
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Serial</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project, index) => (
                            <tr key={project._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{project.title}</td>
                                <td>{project.category || 'N/A'}</td>
                                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                                <td>
                                    <Button className='mx-2' variant="info" onClick={() => handleShowDetails(project)}>
                                        <FaEye />
                                    </Button>
                                    <Button className='mx-2' variant="warning" onClick={() => handleNavigateToUpdate(project)}>
                                        <FaEdit />
                                    </Button>
                                    <Button className='mx-2' variant="danger" onClick={() => handleShowDelete(project)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            {/* Details Modal */}
            <Modal show={showDetailsModal} onHide={handleCloseDetails} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold">{selectedProject ? selectedProject.title : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProject && (
                        <div className="container">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <h5 className="font-weight-bold">Project Details</h5>
                                    <p><strong>Category:</strong> {selectedProject.category || 'N/A'}</p>
                                    <p><strong>Client Name:</strong> {selectedProject.client?.name || 'N/A'}</p>
                                    <p><strong>Client Email:</strong> {selectedProject.client?.email || 'N/A'}</p>
                                    <p><strong>Client Phone:</strong> {selectedProject.client?.phone || 'N/A'}</p>
                                    <p><strong>Start Date:</strong> {new Date(selectedProject.startDate).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {selectedProject.endDate ? new Date(selectedProject.endDate).toLocaleDateString() : 'Ongoing'}</p>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <h5 className="font-weight-bold">Review</h5>
                                    <p><strong>Rating:</strong> {selectedProject.review?.rating || 'No rating provided'}</p>
                                    <p><strong>Comment:</strong> {selectedProject.review?.comment || 'No review provided'}</p>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <h5 className="font-weight-bold">Description</h5>
                                    <p>{selectedProject.description || 'No description provided'}</p>
                                </div>
                            </div>

                            {selectedProject.mainImage && (
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5 className="font-weight-bold">Main Image</h5>
                                        <div className="card">
                                            <img src={selectedProject.mainImage} alt="Main" className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedProject.additionalImages.length > 0 && (
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5 className="font-weight-bold">Additional Images</h5>
                                        <div className="d-flex flex-wrap">
                                            {selectedProject.additionalImages.map((image, index) => (
                                                <div key={index} className="card mr-2 mb-2" style={{ width: '100px' }}>
                                                    <img src={image} alt={`Additional ${index}`} className="card-img-top" style={{ height: '100px', objectFit: 'cover' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this project: <strong>{selectedProject ? selectedProject.title : ''}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProject}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ProjectList;



