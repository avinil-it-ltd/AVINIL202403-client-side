import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectListForUpdate = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/projects');
                setProjects(response.data);
            } catch (error) {
                setError('Error fetching projects. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Select a Project to Update</h2>
            <ul className="list-group">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <li key={project._id} className="list-group-item">
                            <Link to={`/dashboard/updateProject/${project._id}`} className="text-decoration-none">
                                {project.title}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No projects available.</li>
                )}
            </ul>
        </div>
    );
};

export default ProjectListForUpdate;
