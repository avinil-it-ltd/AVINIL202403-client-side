import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/api/projects');
                const response = await axios.get('http://localhost:5000/api/projects');
                setProjects(response.data);
                console.log(response.data);
                
            } catch (error) {
                setError("Error fetching projects!");
                console.error("There was an error fetching the projects!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`);
            // await axios.delete(`http://localhost:5000/api/projects/${id}`);
            setProjects(projects.filter(project => project._id !== id)); // Remove deleted project from state
        } catch (error) {
            setError('Error deleting project.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        
        <div className="container my-4">
            <h2 className="text-center mb-4">Project List</h2>
            {projects.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project._id}>
                                <td>{index + 1}</td>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>
                                    <Link to={`/dashboard/updateProject/${project._id}`} className="btn btn-primary btn-sm me-2">
                                        Edit
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No projects available. Please add some projects.</p>
            )}
        </div>
    );
};

export default ProjectList;
