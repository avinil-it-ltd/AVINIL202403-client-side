import React, { useState } from "react";
import TopMenu from "../../core/TopMenu";
import Footer from "../../core/footer";
import axios from 'axios';
import '../../custom.css'

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // Change to phoneNumber
    const [message, setMessage] = useState(""); // Changed from interest to message
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const clickSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/contacts', { // Changed to /contact
                name,
                email,
                phoneNumber, // Ensure this matches your model
                message // Ensure this matches your model
            });

            if (response.status === 201) {
                setSuccess(true);
                setError(false);
                setName("");
                setEmail("");
                setPhoneNumber(""); // Reset to empty
                setMessage(""); // Reset to empty
            }
        } catch (err) {
            console.error(err);
            setError(true);
            setSuccess(false);
        }
    }

    const showSuccess = () => (
        <div className="alert alert-warning text-dark" style={{ display: success ? "" : "none" }}>
            Thank You. Soon our team will contact you.
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger text-dark" style={{ display: error ? "" : "none" }}>
            Something went wrong. Please try again.
        </div>
    );

    const contactForm = () => (
        <div>
            <div>
                <div className="col-11 col-md-9 mx-auto p-5 my-5" style={{ opacity: "0.9" }}>
                    <div className="row">
                        <div className="col-12 col-md-6 p-4 text-black">
                            <div className="mb-4">
                                <p className="h5 heading_color">
                                    <i className="fas fa-map-marker-alt me-3"></i> Address:
                                </p>
                                <p>1 / 2 Asad Avenue Road, Block-A, Mohammadpur, Dhaka</p>
                            </div>
                            <hr className="my-4 text-white" />
                            <div className="mb-4">
                                <p className="h5 heading_color">
                                    <i className="fas fa-phone me-3"></i> Phone:
                                </p>
                                <p>+8801819139975</p>
                            </div>
                            <hr className="my-4 text-white" />
                            <div className="mb-4">
                                <p className="h5 heading_color">
                                    <i className="fas fa-envelope me-3"></i> Email:
                                </p>
                                <p>3pcommunication@gmail.com</p>
                            </div>
                            <hr className="my-4 text-white" />
                            <div className="mb-4">
                                <p className="h5 mb-3">Connect with Us:</p>
                                <div className="d-flex">
                                    <a href="https://www.facebook.com/3PCommunication" target="_blank" rel="noopener noreferrer" className="heading_color me-3">
                                        <i className="fab fa-facebook" style={{ fontSize: "30px" }}></i>
                                    </a>
                                    <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" className="heading_color me-3">
                                        <i className="fab fa-whatsapp" style={{ fontSize: "30px" }}></i>
                                    </a>
                                    <a href="https://www.youtube.com/@3pcommunication569" target="_blank" rel="noopener noreferrer" className="heading_color">
                                        <i className="fab fa-youtube" style={{ fontSize: "30px" }}></i>
                                    </a>
                                </div>
                            </div>
                            <hr className="text-white d-md-none" />
                        </div>

                        <div className="col-12 col-md-6 ContactDesign px-5">
                            <p className="h2 heading_color mt-3 text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Contact Us</p>
                            {showSuccess()}
                            {showError()}
                            <form>
                                <div className="form-group">
                                    <label className="text-dark my-1">Name:</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control col-12" value={name} required />
                                </div>
                                <div className="form-group">
                                    <label className="text-dark my-1">Email:</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control col-12" value={email} required />
                                </div>
                                <div className="form-group">
                                    <label className="text-dark my-1">Phone No:</label>
                                    <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" className="form-control col-12" value={phoneNumber} required />
                                </div>
                                <div className="form-group">
                                    <label className="text-dark my-1">Message:</label>
                                    <textarea rows="4" onChange={(e) => setMessage(e.target.value)} className="form-control col-12" value={message} required></textarea>
                                </div>
                                <button onClick={clickSubmit} type="submit" className="my-4 col-12 btn special_button btn-lg btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <TopMenu />
            <div>{contactForm()}</div>
            <Footer />
        </div>
    );
};

export default Contact;
