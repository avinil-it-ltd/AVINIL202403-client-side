import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangeAboutDetails = () => {
    const [formData, setFormData] = useState({
        ceoName: "Prokash Banik",
        ceoPosition: "CEO, 3P Communication",
        projectsCompleted: "200+",
        awardsReceived: "5",
        happyCustomers: "175+",
        yearsInService: "15",
        directorDescription:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet fugit quod iure dolores ad aliquam sequi dicta possimus asperiores?",
        whyChooseUs: [
            { heading: "Left Heading", description: "This is a small paragraph for the left section." },
            { heading: "Left Heading", description: "This is a small paragraph for the left section." },
            { heading: "Left Heading", description: "This is a small paragraph for the left section." }
        ]
    });

    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleWhyChooseUsChange = (index, field, value) => {
        const updatedWhyChooseUs = [...formData.whyChooseUs];
        updatedWhyChooseUs[index][field] = value;
        setFormData({ ...formData, whyChooseUs: updatedWhyChooseUs });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true); // Show the modal on submit
    };

    const handleConfirmUpdate = () => {
        setShowModal(false); // Close modal
        // Logic to submit the updated data (e.g., send it to an API)
        console.log("Updated About Us Data: ", formData);
        // alert('About Us Page Updated Successfully!');
    };

    return (
        <div className="container card w-75 shadow-sm p-5">
            <h2 className="my-4">Dashboard: Update About Us Page</h2>
            <form onSubmit={handleSubmit}>
                {/* CEO Section */}
                <div className="form-group mb-3">
                    <label className='fw-bold'> Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ceoName"
                        value={formData.ceoName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className='fw-bold'>Company Position</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ceoPosition"
                        value={formData.ceoPosition}
                        onChange={handleChange}
                    />
                </div>

                {/* Projects Stats Section */}
                <h4 className="my-4">Project Statistics</h4>
                <div className="form-group mb-3">
                    <label className='fw-bold'>Projects Completed</label>
                    <input
                        type="text"
                        className="form-control"
                        name="projectsCompleted"
                        value={formData.projectsCompleted}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className='fw-bold'>Awards Received</label>
                    <input
                        type="text"
                        className="form-control"
                        name="awardsReceived"
                        value={formData.awardsReceived}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className='fw-bold'>Happy Customers</label>
                    <input
                        type="text"
                        className="form-control"
                        name="happyCustomers"
                        value={formData.happyCustomers}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className='fw-bold'>Years in Service</label>
                    <input
                        type="text"
                        className="form-control"
                        name="yearsInService"
                        value={formData.yearsInService}
                        onChange={handleChange}
                    />
                </div>

                {/* Director Description */}
                <div className="form-group mb-3">
                    <label className='fw-bold'>Director Description</label>
                    <textarea
                        className="form-control"
                        name="directorDescription"
                        rows="4"
                        value={formData.directorDescription}
                        onChange={handleChange}
                    />
                </div>

                {/* Why Choose Us Section */}
                <h4 className="my-4">Why Choose Us</h4>
                {formData.whyChooseUs.map((item, index) => (
                    <div key={index} className="mb-3">
                        <label className='fw-bold'>Heading {index + 1}</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={item.heading}
                            onChange={(e) => handleWhyChooseUsChange(index, "heading", e.target.value)}
                        />
                        <label className='fw-bold'>Description {index + 1}</label>
                        <textarea
                            className="form-control"
                            value={item.description}
                            onChange={(e) => handleWhyChooseUsChange(index, "description", e.target.value)}
                            rows="2"
                        />
                    </div>
                ))}

                <button type="submit" className="btn btn-primary">Update About Us Page</button>
            </form>

            {/* Confirmation Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered // This makes the modal vertically centered
                className="custom-modal" // Add a custom class for additional styling
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to update the "About Us" page details?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Yes, Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ChangeAboutDetails;
