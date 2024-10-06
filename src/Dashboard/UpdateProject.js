import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProject = () => {
    const { id } = useParams(); // Get the project ID from URL
    const navigate = useNavigate();
    const [project, setProject] = useState({ title: '', description: '', imageUrl: '', startDate: '', endDate: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                setError('Error fetching project details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/projects/${id}`, project);
            navigate('/dashboard/projects'); // Redirect to project list after update
        } catch (error) {
            setError('Error updating project.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        // <form onSubmit={handleSubmit}>
        //     <h2>Update Project</h2>
        //     <input
        //         type="text"
        //         name="title"
        //         value={project.title}
        //         onChange={handleChange}
        //         placeholder="Title"
        //     />
        //     <textarea
        //         name="description"
        //         value={project.description}
        //         onChange={handleChange}
        //         placeholder="Description"
        //     />
        //     <input
        //         type="text"
        //         name="imageUrl"
        //         value={project.imageUrl}
        //         onChange={handleChange}
        //         placeholder="Image URL"
        //     />
        //     <input
        //         type="date"
        //         name="startDate"
        //         value={project.startDate}
        //         onChange={handleChange}
        //     />
        //     <input
        //         type="date"
        //         name="endDate"
        //         value={project.endDate}
        //         onChange={handleChange}
        //     />
        //     <button type="submit">Update Project</button>
        // </form>
        <div className="container mt-5">
        <h2 className="text-center mb-4">Update Project</h2>
        <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light">
            <div className="form-group">
                <label htmlFor="title">Project Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                    placeholder="Enter project description"
                    rows="4"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    value={project.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                />
            </div>

            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={project.startDate}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={project.endDate}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
                Update Project
            </button>
        </form>
    </div>

    );
};

export default UpdateProject;
