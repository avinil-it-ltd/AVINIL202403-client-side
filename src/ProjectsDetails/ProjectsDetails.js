import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Footer from '../core/footer';
import TopMenu from '../core/TopMenu';
import '../../src/Exterior/Architecture.css'

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function ProjectsDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dummyProject = {
            title: "Sonali Bank Plc Sub Branch , Chittagong ",
            client: {
                name: "ABC Corporation",
                address: "123, Business Park, Dhaka",
                area: "1200 sq. ft.",
                projectType: "E-Commerce Platform",
                logo: "https://via.placeholder.com/150.png?text=Client+Logo" // Dummy clent logo or image
            },
            images: [
                "https://via.placeholder.com/600x400.png?text=Project+Image+1",
                "https://via.placeholder.com/600x400.png?text=Project+Image+2",
                "https://via.placeholder.com/600x400.png?text=Project+Image+2",
                "https://via.placeholder.com/600x400.png?text=Project+Image+2",
                "https://via.placeholder.com/600x400.png?text=Project+Image+2",
                "https://via.placeholder.com/600x400.png?text=Project+Image+3"
            ],
            review: {
                clientName: "John Doe",
                feedback: "The team did a fantastic job delivering a fully functional e-commerce platform. Highly recommended!",
                position: "Director"
            },
            descriptions: [
                "Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience.Initial planning and requirement gathering. Designing the website layout and user experience. Developing the backend functionality for user management and payments. Implementing frontend features like product search and filtering. Final testing and deployment."
            ],
            contactInfo: {
                phone: "+8801819139975",
                email: "3pcommunication@gmail.com",
                address: "1 / 2 Asad Avenue Road, Block-A, Mohammadpur, Dhaka"
            }
        };

        setTimeout(() => {
            setProject(dummyProject);
            setLoading(false);
        }, 1000);
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
            <TopMenu></TopMenu>
            <Container className="project-details ">
                {/* Project Title */}
                <Row className="mb-4 detailsTitle ">
                    <Col >
                        <h2 className="text-center py-5">{project.title}</h2>
                        {/* <hr className="divider" /> */}
                    </Col>
                </Row>

                {/* Client Information */}
                <Row className="align-items-center  mb-4">
                    <Col md={3} className="text-center">
                        <Card.Img src={project.client.logo} alt="Client Logo" className="img-fluid rounded" />
                    </Col>
                    <Col md={9}>
                        <h4 className='heading_color'>Client: {project.client.name}</h4>
                        <p><strong>Address:</strong> {project.client.address}</p>
                        <p><strong>Area:</strong> {project.client.area}</p>
                        <p><strong>Project Type:</strong> {project.client.projectType}</p>
                    </Col>
                </Row>

                {/* Relevant Project Images */}
                <Row className="mb-5">
                    {project.images.map((image, index) => (
                        <Col md={4} key={index} className="mb-3">
                            <Card className="border-0">
                                <Card.Img src={image} alt={`Project Image ${index + 1}`} className="img-fluid rounded shadow-sm" />
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Client Review */}
                <Row className="mb-5 detailsPageReview py-5 shadow-lg">
                    {/* <Row className="mb-5 bg-light py-5 shadow-lg"> */}
                    <Col md={12} >
                        <h4 className="text-center heading_color mb-3 ">KIND WORDS FROM OUR CLIENT</h4>
                        <hr className="divider" />
                        <div className="p-4 text-center ">
                            <p> {project.review.feedback} </p>
                            <p> - {project.review.clientName} , {project.review.position}</p>

                        </div>
                    </Col>
                </Row>

                {/* Project Description (Step by Step) */}
                <Row className="my-5 py-5 ">
                    <Col>
                        <h4 className="pt-5 heading_color mb-3">Project Description </h4>

                        <p>{project.descriptions}</p>
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
                                +8801819139975
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
                                3pcommunication@gmail.com
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
                                1 / 2 Asad Avenue Road, Block-A, Mohammadpur, Dhaka
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>




            </Container>
            <Footer></Footer>
        </div>
    );
}

export default ProjectsDetails;























// import { useParams } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
// // import './ProjectsDetails.css';

// function ProjectsDetails() {
//     const { id } = useParams(); // Get the project ID from the URL
//     const [project, setProject] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch project data based on the ID
//         fetch(`/api/projects/${id}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setProject(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching project data:', error);
//                 setLoading(false);
//             });
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
//         <Container className="project-details my-5">
//             <Row className="mb-4">
//                 <Col>
//                     <h2 className="text-center">{project.title}</h2>
//                     <hr className="divider" />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col md={6}>
//                     <Card className="border-0">
//                         <Card.Img
//                             src={project.image}
//                             alt={project.title}
//                             className="img-fluid rounded shadow-sm"
//                         />
//                     </Card>
//                 </Col>
//                 <Col md={6}>
//                     <div className="project-info p-4">
//                         <h4>Project Description</h4>
//                         <p>{project.description}</p>
//                         <h5>Key Features:</h5>
//                         <ul>
//                             {project.features &&
//                                 project.features.map((feature, index) => (
//                                     <li key={index}>{feature}</li>
//                                 ))}
//                         </ul>
//                         <h5>Technologies Used:</h5>
//                         <p>{project.technologies}</p>
//                     </div>
//                 </Col>
//             </Row>
//             <Row className="mt-5">
//                 <Col>
//                     <h4 className="text-center">Additional Information</h4>
//                     <p className="text-center">{project.additionalInfo}</p>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default ProjectsDetails;
