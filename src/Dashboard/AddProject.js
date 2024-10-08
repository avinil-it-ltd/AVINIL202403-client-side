import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProject = { title, description, imageUrl, startDate, endDate };
            await axios.post('http://localhost:5000/api/projects', newProject);
            history.push('/dashboard/projects'); // Redirect to project list
        } catch (error) {
            console.error("There was an error creating the project!", error);
        }
    };

    return (
        <div className="container my-4">
        <h2 className="text-center mb-4">Add New Project</h2>
        <Form onSubmit={handleSubmit} className="p-4 border border-light rounded shadow">
            <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter project title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Enter project description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </Form.Group>
            <Form.Group controlId="formImageUrl" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter image URL" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId="formStartDate" className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId="formEndDate" className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
            </Form.Group>
            <div className="text-center">
                <Button variant="primary" type="submit">Add Project</Button>
            </div>
        </Form>
    </div>
    );
};

export default AddProject;
