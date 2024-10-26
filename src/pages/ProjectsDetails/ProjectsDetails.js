// import { useParams } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
// import Footer from '../../core/Footer';
// import TopMenu from '../../core/TopMenu';
// import '../../pages/Exterior/Exterior.css'

// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// function ProjectsDetails() {
//     const { id } = useParams();
//     const [project, setProject] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const dummyProject = {
//             title: "Sonali Bank Plc Sub Branch , Chittagong ",
//             client: {
//                 name: "ABC Corporation",
//                 address: "123, Business Park, Dhaka",
//                 area: "1200 sq. ft.",
//                 projectType: "E-Commerce Platform",
//                 logo: "https://via.placeholder.com/150.png?text=Client+Logo" // Dummy clent logo or image
//             },
//             images: [
//                 "https://via.placeholder.com/600x400.png?text=Project+Image+1",
//                 "https://via.placeholder.com/600x400.png?text=Project+Image+2",
//                 "https://via.placeholder.com/600x400.png?text=Project+Image+2",
//                 "https://via.placeholder.com/600x400.png?text=Project+Image+2",
//                 "https://via.placeholder.com/600x400.png?text=Project+Image+2",
//                 "https://via.placeholder.com/600x400.png?text=Project+Image+3"
//             ],
//             review: {
//                 clientName: "John Doe",
//                 feedback: "The team did a fantastic job delivering a fully functional e-commerce platform. Highly recommended!",
//                 position: "Director"
//             },
//             descriptions: [
//                 "Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience. Developing the backend functionality for user management and payments. Implementing frontend features like product search and filtering. Final testing and deployment."
//             ],
//             contactInfo: {
//                 phone: "+8801819139975",
//                 email: "3pcommunication@gmail.com",
//                 address: "1 / 2 Asad Avenue Road, Block-A, Mohammadpur, Dhaka"
//             }
//         };

//         setTimeout(() => {
//             setProject(dummyProject);
//             setLoading(false);
//         }, 1000);
//     }, [id]);

//     if (loading) {
//         return (
//             <Container className="text-center my-5">
//                 <Spinner animation="border" variant="primary" />
//                 <p>Loading project details...</p>
//             </Container>
//         );
//     }

//     if (!project) {
//         return (
//             <Container className="text-center my-5">
//                 <h3>Project not found</h3>
//                 <p>We're sorry, but the project you're looking for does not exist.</p>
//             </Container>
//         );
//     }

//     return (
//         <div>
//             <TopMenu></TopMenu>
//             <Container className="project-details ">
//                 {/* Project Title */}
//                 <Row className="mb-4 detailsTitle ">
//                     <Col >
//                         <h2 className="text-center py-5">{project.title}</h2>
//                         {/* <hr className="divider" /> */}
//                     </Col>
//                 </Row>

//                 {/* Client Information */}
//                 <Row className="align-items-center  mb-4">
//                     <Col md={3} className="text-center">
//                         <Card.Img src={project.client.logo} alt="Client Logo" className="img-fluid rounded" />
//                     </Col>
//                     <Col md={9}>
//                         <h4 className='heading_color'>Client: {project.client.name}</h4>
//                         <p><strong>Address:</strong> {project.client.address}</p>
//                         <p><strong>Area:</strong> {project.client.area}</p>
//                         <p><strong>Project Type:</strong> {project.client.projectType}</p>
//                     </Col>
//                 </Row>

//                 {/* Relevant Project Images */}
//                 <Row className="mb-5">
//                     {project.images.map((image, index) => (
//                         <Col md={4} key={index} className="mb-3">
//                             <Card className="border-0">
//                                 <Card.Img src={image} alt={`Project Image ${index + 1}`} className="img-fluid rounded shadow-sm" />
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>

//                 {/* Client Review */}
//                 <Row className="mb-5 detailsPageReview py-5 shadow-lg">
//                     {/* <Row className="mb-5 bg-light py-5 shadow-lg"> */}
//                     <Col md={12} >
//                         <h4 className="text-center heading_color mb-3 ">KIND WORDS FROM OUR CLIENT</h4>
//                         <hr className="divider" />
//                         <div className="p-4 text-center ">
//                             <p> {project.review.feedback} </p>
//                             <p> - {project.review.clientName} , {project.review.position}</p>

//                         </div>
//                     </Col>
//                 </Row>

//                 {/* Project Description (Step by Step) */}
//                 <Row className="my-5 py-5 ">
//                     <Col>
//                         <h4 className="pt-5 heading_color mb-3">Project Description </h4>

//                         <p>{project.descriptions}</p>
//                     </Col>
//                 </Row>







//                 {/* Contact Information */}
//                 <Row className="mb-5">
//                     <Col md={4} className="text-center">
//                         <Card className="p-4 shadow-sm detailsPageReview heading_color shadow-lg h-100">
//                             <div className="d-flex justify-content-center">
//                                 <FaPhoneAlt size={50} className="mb-3" />
//                             </div>
//                             <Card.Text>
//                                 <strong>Phone:</strong><br />
//                                 +8801819139975
//                             </Card.Text>
//                         </Card>
//                     </Col>
//                     <Col md={4} className="text-center">
//                         <Card className="p-4 shadow-sm detailsPageReview heading_color shadow-lg h-100">
//                             <div className="d-flex justify-content-center">
//                                 <FaEnvelope size={50} className="mb-3" />
//                             </div>
//                             <Card.Text>
//                                 <strong>Email:</strong><br />
//                                 3pcommunication@gmail.com
//                             </Card.Text>
//                         </Card>
//                     </Col>
//                     <Col md={4} className="text-center">
//                         <Card className="p-4 shadow-sm detailsPageReview heading_color shadow-lg h-100">
//                             <div className="d-flex justify-content-center">
//                                 <FaMapMarkerAlt size={50} className="mb-3" />
//                             </div>
//                             <Card.Text>
//                                 <strong>Address:</strong><br />
//                                 1 / 2 Asad Avenue Road, Block-A, Mohammadpur, Dhaka
//                             </Card.Text>
//                         </Card>
//                     </Col>
//                 </Row>




//             </Container>
//             <Footer></Footer>
//         </div>
//     );
// }

// export default ProjectsDetails;


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
                const response = await axios.get(`http://localhost:5000/api/projects/${id}`); // Replace with your actual API endpoint
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
                {/* Project Title */}
                <Row className="mb-4 detailsTitle">
                    <Col>
                        <h2 className="text-center py-5">{project.title || "Untitled Project"}</h2>
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

                {/* Client Review */}
                <Row className="mb-5 detailsPageReview py-5 shadow-lg">
                    <Col md={12}>
                        <h4 className="text-center heading_color mb-3">KIND WORDS FROM OUR CLIENT</h4>
                        <hr className="divider" />
                        <div className="p-4 text-center">
                            <p>{project?.review?.comment || "No feedback available"}</p>
                            <p>- Rating: {project?.review?.rating || "N/A"} stars</p>
                        </div>
                    </Col>
                </Row>

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

                {/* Contact Information */}
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
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ProjectsDetails;
