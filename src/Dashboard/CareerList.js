// src/Dashboard/CareerList.js
import React, { useEffect, useState } from 'react';
import { getAllCareers, deleteCareer } from '../services/careerService';
import { Link } from 'react-router-dom';

const CareerList = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await getAllCareers();
                setCareers(response);
            } catch (error) {
                setError('Error fetching careers');
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this career?')) {
            try {
                await deleteCareer(id);
                setCareers(careers.filter(career => career._id !== id));
            } catch (error) {
                setError('Error deleting career');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Career List</h2>
            <Link to="/dashboard/addCareer" className="btn btn-primary">Add Career</Link>
            <ul>
                {careers.map(career => (
                    <li key={career._id}>
                        <h4>{career.title}</h4>
                        <p>{career.description}</p>
                        <button className="btn btn-warning" onClick={() => handleDelete(career._id)}>Delete</button>
                        <Link to={`/dashboard/updateCareer/${career._id}`} className="btn btn-info">Update</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CareerList;
