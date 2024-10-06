// src/Dashboard/AddCareer.js
import React, { useState } from 'react';
import { createCareer } from '../services/careerService';
import { useNavigate } from 'react-router-dom';

const AddCareer = () => {
    const [career, setCareer] = useState({
        title: '',
        description: '',
        requirements: '',
        location: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCareer({ ...career, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCareer(career);
            navigate('/dashboard/careers');
        } catch (error) {
            console.error('Error creating career:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h2>Add Career</h2>
            <input type="text" name="title" value={career.title} onChange={handleChange} placeholder="Title" className="form-control mb-3" />
            <textarea name="description" value={career.description} onChange={handleChange} placeholder="Description" className="form-control mb-3" />
            <input type="text" name="requirements" value={career.requirements} onChange={handleChange} placeholder="Requirements" className="form-control mb-3" />
            <input type="text" name="location" value={career.location} onChange={handleChange} placeholder="Location" className="form-control mb-3" />
            <button type="submit" className="btn btn-success">Add Career</button>
        </form>
    );
};

export default AddCareer;
