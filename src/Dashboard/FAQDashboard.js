import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './css/dashboard.css';

const FAQDashboard = () => {
    const [faqs, setFaqs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editFaq, setEditFaq] = useState(null);
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        const res = await axios.get('http://localhost:5000/api/faqs'); // Replace with your backend API
        setFaqs(res.data);
    };

    const handleShowModal = (faq = null) => {
        setEditFaq(faq);
        setNewFaq(faq ? faq : { question: '', answer: '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (editFaq) {
            await axios.put(`http://localhost:5000/api/faqs/${editFaq._id}`, newFaq); // Update FAQ
        } else {
            await axios.post('http://localhost:5000/api/faqs', newFaq); // Create new FAQ
        }
        fetchFAQs();
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this FAQ?');
        if (confirmed) {
            await axios.delete(`http://localhost:5000/api/faqs/${id}`);
            fetchFAQs();
        }
    };

    return (
        <div>
            <h2 className='text-center my-5'>FAQ Management</h2>
            <div>
                <Button onClick={() => handleShowModal()} className="mb-3">
                    Add New FAQ
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.map((faq, index) => (
                        <tr key={faq._id}>
                            <td>{index + 1}</td>
                            <td>{faq.question}</td>
                            <td>{faq.answer}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowModal(faq)} className="me-2">
                                    <FaEdit /> 
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(faq._id)}>
                                    <FaTrash /> 
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing FAQ */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editFaq ? 'Edit FAQ' : 'Add New FAQ'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                value={newFaq.question}
                                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAnswer" className="mt-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newFaq.answer}
                                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{editFaq ? 'Save Changes' : 'Add FAQ'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FAQDashboard;
