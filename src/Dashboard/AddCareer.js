// src/Dashboard/AddCareer.js
import React, { useState } from 'react';
import { createCareer } from '../services/careerService';
import { useNavigate } from 'react-router-dom';

const AddCareer = () => {
    const [career, setCareer] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
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
        <div className="container my-4 w-75 mx-auto ">
            <form onSubmit={handleSubmit} className="p-4 border border-light rounded shadow">
                <h2 className="text-center mb-4">Add Career</h2>
                <div className="mb-3">
                    <label className='fw-bold pb-2'>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={career.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                <label className='fw-bold pb-2'>Description</label>
                    <textarea
                        name="description"
                        value={career.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="form-control"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-3">
                <label className='fw-bold pb-2'>Requirements</label>
                    <input
                        type="text"
                        name="requirements"
                        value={career.requirements}
                        onChange={handleChange}
                        placeholder="Requirements"
                        className="form-control"
                        required
                    />
                </div>
                {/* salary */}
                <div className="mb-3">
                <label className='fw-bold pb-2'>Salary</label>
                    <input
                        type="text"
                        name="salary"
                        value={career.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                <label className='fw-bold pb-2'>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={career.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="form-control"
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success">Add Career</button>
                </div>
            </form>
        </div>
    );
};

export default AddCareer;
