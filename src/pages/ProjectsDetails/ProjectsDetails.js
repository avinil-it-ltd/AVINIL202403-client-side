import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Footer from '../../core/Footer';
import TopMenu from '../../core/TopMenu';
import '../../pages/Exterior/Exterior.css';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function ProjectsDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`https://3pcommunicationsserver.vercel.app/api/projects/${id}`); // Replace with your actual API endpoint
                console.log(response.data.project);
                setProject(response.data.project);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading project details...</p>
            </Container>
        );
    }

    if (!project) {
        return (
            <Container className="text-center my-5">
                <h3>Project not found</h3>
                <p>We're sorry, but the project you're looking for does not exist.</p>
            </Container>
        );
    }

    return (
        <div>
            <TopMenu />
            <Container className="project-details">
                <div className=''>
                    {/* Project Title */}
                    <Row className="mb-4 detailsTitle ">
                        <Col>
                            <h2 className="text-center text-dark py-5">{project.title || "Untitled Project"}</h2>
                        </Col>
                    </Row>

                    {/* Client Information */}
                    <Row className="align-items-center mb-4">
                        <Col md={3} className="text-center">
                            <Card.Img
                                src={project.mainImage || "https://via.placeholder.com/150.png?text=No+Image"}
                                alt="Project Main Image"
                                className="img-fluid rounded"
                            />
                        </Col>
                        <Col md={9}>
                            <h4 className="heading_color">Client: {project?.client?.name || "Unknown Client"}</h4>
                            <p><strong>Email:</strong> {project?.client?.email || "N/A"}</p>
                            <p><strong>Phone:</strong> {project?.client?.phone || "N/A"}</p>
                        </Col>
                    </Row>
                </div>

                {/* Relevant Project Images */}
                <Row className="mb-5">
                    {project?.additionalImages?.length > 0 ? project.additionalImages.map((image, index) => (
                        <Col md={4} key={index} className="mb-3">
                            <Card className="border-0">
                                <Card.Img
                                    src={image}
                                    alt={`Project Image ${index + 1}`}
                                    className="img-fluid rounded shadow-sm"
                                />
                            </Card>
                        </Col>
                    )) : <p>No additional images available</p>}
                </Row>






                <div className="w-100 bg-dark my-5 py-5">
                    <div className="d-flex flex-column flex-md-row justify-content-around align-items-center text-center text-md-start text-black fw-bolder px-3 px-md-5 callNow_font">

                        {/* Column 1 - Text */}
                        <div className="col-md-4 mb-3 mb-md-0 text-white">
                            <h3>CONTACT NOW FOR YOUR DREAM INTO REALITY</h3>
                        </div>

                        {/* Column 2 - Phone Number with Icon */}
                        <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="icon-circle">
                                    <i className="bi bi-telephone-fill"></i> {/* Bootstrap phone icon */}
                                </div>
                                <div className="px-3 pt-3">
                                    <p className="text-warning"> CALL US<br /><span className="text-white"> +88015846895</span> </p>
                                    <p className="ms-2 fw-bold"></p>
                                </div>
                            </div>
                        </div>

                        {/* Column 3 - Email with Icon */}
                        <div className="col-md-4 d-flex align-items-center justify-content-center">
                            <div>

                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="icon-circle">
                                        <i className="bi bi-envelope-fill"></i> {/* Bootstrap envelope icon */}
                                    </div>
                                    <div className="px-3 pt-3">
                                        <p className="text-warning">PLEASE SEND EMAIL<br /> <span className="fw-bold text-white">info@example.com</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>





                {/* Project Description */}
                <Row className="my-5 py-5">
                    <Col>
                        <h4 className="pt-5 heading_color mb-3">Project Description</h4>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: project?.description || "No description available",
                            }}
                        />

                        {/* <p>{project?.description || "No description available"}</p> */}
                    </Col>
                </Row>



                {/* Client Review */}
                <Row className="mb-5  detailsTitle py-5 shadow-md">
                    <Col md={12}>
                        <h4 className="text-center heading_color mb-3">KIND WORDS FROM OUR CLIENT</h4>
                        <hr className="divider text-dark" />
                        <div className="p-4 text-center text-dark">
                            <p>{project?.review?.comment || "No feedback available"}</p>
                            <p>- Rating: {project?.review?.rating || "N/A"} stars</p>
                        </div>
                    </Col>
                </Row>

                {/* Contact Information
                <Row className="mb-5">
                    <Col md={4} className="text-center">
                        <Card className="p-4 shadow-sm detailsPageReview heading_color shadow-lg h-100">
                            <div className="d-flex justify-content-center">
                                <FaPhoneAlt size={50} className="mb-3" />
                            </div>
                            <Card.Text>
                                <strong>Phone:</strong><br />
                                {project?.client?.phone || "N/A"}
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col md={4} className="text-center">
                        <Card className="p-4 shadow-sm detailsPageReview heading_color shadow-lg h-100">
                            <div className="d-flex justify-content-center">
                                <FaEnvelope size={50} className="mb-3" />
                            </div>
                            <Card.Text>
                                <strong>Email:</strong><br />
                                {project?.client?.email || "N/A"}
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col md={4} className="text-center">
                        <Card className="p-4 shadow-sm detailsPageReview heading_color shadow-lg h-100">
                            <div className="d-flex justify-content-center">
                                <FaMapMarkerAlt size={50} className="mb-3" />
                            </div>
                            <Card.Text>
                                <strong>Address:</strong><br />
                                {project?.client?.address || "N/A"}
                            </Card.Text>
                        </Card>
                    </Col>
                </Row> */}
            </Container>
            <Footer />
        </div>
    );
}

export default ProjectsDetails;
