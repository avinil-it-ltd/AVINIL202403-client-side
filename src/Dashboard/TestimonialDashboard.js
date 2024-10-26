// src/components/TestimonialDashboard.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './css/dashboard.css';

const TestimonialDashboard = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editTestimonial, setEditTestimonial] = useState(null);
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        content: '',
        designation: '',
        imageUrl: ''
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const res = await axios.get('http://localhost:5000/api/testimonials');
        setTestimonials(res.data);
    };

    const handleShowModal = (testimonial = null) => {
        setEditTestimonial(testimonial);
        setNewTestimonial(testimonial ? testimonial : { name: '', content: '', designation: '', imageUrl: '' });
        setImagePreview(testimonial ? testimonial.imageUrl : null);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (newTestimonial.imageUrl && typeof newTestimonial.imageUrl !== 'string') {
                const uploadedImageUrl = await uploadImageToCloudinary(newTestimonial.imageUrl);
                newTestimonial.imageUrl = uploadedImageUrl;
            }

            if (editTestimonial) {
                await axios.put(`http://localhost:5000/api/testimonials/${editTestimonial._id}`, newTestimonial);
            } else {
                await axios.post('http://localhost:5000/api/testimonials', newTestimonial);
            }

            fetchTestimonials();
            setShowModal(false);
            setImagePreview(null);
        } catch (error) {
            console.error("Error saving testimonial:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this testimonial?');
        if (confirmed) {
            await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
            fetchTestimonials();
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "3pcommunications");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/avinilit/image/upload`,
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            throw error;
        }
    };

    // Handle image selection and preview display
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewTestimonial({ ...newTestimonial, imageUrl: file });
        setImagePreview(URL.createObjectURL(file));
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setNewTestimonial({ ...newTestimonial, imageUrl: '' });
        setImagePreview(null);
    };

    return (
        <div>
            <h2 className='text-center my-5'>Testimonial Management</h2>
            <div>
                <Button onClick={() => handleShowModal()} className="mb-3">
                    Add New Testimonial
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Content</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial, index) => (
                        <tr key={testimonial._id}>
                            <td>{index + 1}</td>
                            <td>{testimonial.name}</td>
                            <td>{testimonial.content}</td>
                            <td>{testimonial.designation}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowModal(testimonial)} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(testimonial._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Testimonial */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTestimonial.name}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newTestimonial.content}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDesignation" className="mt-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTestimonial.designation}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, designation: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage" className="mt-3">
                            <Form.Label>Image </Form.Label>
                            {imagePreview ? (
                                <div className="image-preview-container">
                                    <img src={imagePreview} alt="Preview" className="image-preview"  />
                                    <Button variant="danger" onClick={handleRemoveImage} className="remove-image-btn">
                                        <FaTrash />
                                    </Button>
                                </div>
                            ) : (
                                <Form.Control
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{editTestimonial ? 'Save Changes' : 'Add Testimonial'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TestimonialDashboard;
