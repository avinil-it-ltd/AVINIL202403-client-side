import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
// import './ProjectsDetails.css';

function ProjectsDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch project data based on the ID
        fetch(`/api/projects/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching project data:', error);
                setLoading(false);
            });
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
        <Container className="project-details my-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">{project.title}</h2>
                    <hr className="divider" />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card className="border-0">
                        <Card.Img
                            src={project.image}
                            alt={project.title}
                            className="img-fluid rounded shadow-sm"
                        />
                    </Card>
                </Col>
                <Col md={6}>
                    <div className="project-info p-4">
                        <h4>Project Description</h4>
                        <p>{project.description}</p>
                        <h5>Key Features:</h5>
                        <ul>
                            {project.features &&
                                project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                        </ul>
                        <h5>Technologies Used:</h5>
                        <p>{project.technologies}</p>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h4 className="text-center">Additional Information</h4>
                    <p className="text-center">{project.additionalInfo}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ProjectsDetails;
