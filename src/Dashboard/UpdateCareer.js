// src/Dashboard/UpdateCareer.js
import React, { useState, useEffect } from 'react';
import { updateCareer, getAllCareers } from '../services/careerService';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCareer = () => {
    const { id } = useParams();
    const [career, setCareer] = useState({
        title: '',
        description: '',
        requirements: '',
        location: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                const response = await getAllCareers(id);
                setCareer(response);
            } catch (error) {
                console.error('Error fetching career:', error);
            }
        };

        fetchCareer();
    }, [id]);

    const handleChange = (e) => {
        setCareer({ ...career, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCareer(id, career);
            navigate('/dashboard/careers');
        } catch (error) {
            console.error('Error updating career:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 w-75 card mx-auto p-5 ">
            <h2 className='my-4'>Update Career</h2>
            <input type="text" name="title" value={career.title} onChange={handleChange} placeholder="Title" className="form-control mb-3" />
            <textarea name="description" value={career.description} onChange={handleChange} placeholder="Description" className="form-control mb-3" />
            <input type="text" name="requirements" value={career.requirements} onChange={handleChange} placeholder="Requirements" className="form-control mb-3" />
            <input type="text" name="location" value={career.location} onChange={handleChange} placeholder="Location" className="form-control mb-3" />
            <button type="submit" className="btn btn-primary">Update Career</button>
        </form>
    );
};

export default UpdateCareer;
