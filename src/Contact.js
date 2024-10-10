import React, { useState } from "react";
import TopMenu from "./core/TopMenu";
import Footer from "./core/footer";
import axios from 'axios'; // Import Axios for making HTTP requests

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [interest, setInterest] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false); // To handle error messages

    const clickSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/contacts', {
            // const response = await axios.post('http://localhost:5000/api/contacts', {
                name,
                email,
                phoneNo,
                interest
            });

            if (response.status === 200) {
                setSuccess(true);
                setError(false);
                setName("");
                setEmail("");
                setPhoneNo("");
                setInterest("");
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
                        <div className="col-12 col-md-6 my-auto p-3">
                            {/* Contact Details */}
                        </div>
                        <div className="col-12 col-md-6 ContactDesign px-5">
                            <p className="h2 heading_color mt-3 text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Contact Us</p>
                            {showSuccess()}
                            {showError()}
                            <form>
                                <div className="form-group">
                                    <label className="text-dark my-1">Name:</label>
                                    <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control col-12" value={name} required></input>
                                </div>
                                <div className="form-group">
                                    <label className="text-dark my-1">Email:</label>
                                    <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="form-control col-12" value={email} required></input>
                                </div>
                                <div className="form-group">
                                    <label className="text-dark my-1">Phone No:</label>
                                    <input onChange={(e) => { setPhoneNo(e.target.value) }} type="text" className="form-control col-12" value={phoneNo} required></input>
                                </div>
                                <div className="form-group">
                                    <label className="text-dark my-1">Message:</label>
                                    <textarea rows="4" onChange={(e) => { setInterest(e.target.value) }} type="text" className="form-control col-12" value={interest} required></textarea>
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
