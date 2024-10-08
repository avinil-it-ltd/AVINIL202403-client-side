// src/Dashboard/CareerList.js
import React, { useEffect, useState } from 'react';
import { getAllCareers, deleteCareer } from '../services/careerService';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

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
        <div className="container my-4">
            <h2 className="text-center mb-4">Career List</h2>
            <div className="text-end mb-3">
                <Link to="/dashboard/addCareer" className="btn btn-primary">
                    Add Career
                </Link>
            </div>
            {careers.length > 0 ? (
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
                        {careers.map((career, index) => (
                            <tr key={career._id}>
                                <td>{index + 1}</td>
                                <td>{career.title}</td>
                                <td>{career.description}</td>
                                <td>
                                    <Link to={`/dashboard/updateCareer/${career._id}`} className="btn btn-info btn-sm me-2">
                                        Update
                                    </Link>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleDelete(career._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No careers available. Please add some career opportunities.</p>
            )}
        </div>
    );
};

export default CareerList;
