import React, { useState } from "react";
import TopMenu from "./core/TopMenu";
import Footer from "./core/footer";



const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [interest, setInterest] = useState("")
    const [success, setSuccess] = useState(false)

   

    const clickSubmit = (event) => {
        event.preventDefault();
        setSuccess(true)
        setName("");
        setEmail("");
        setPhoneNo("");
        setInterest("");
    }


    const showSuccess = () => (
        <div className="alert alert-warning text-dark" style={{ display: success ? "" : "none" }}>
            Thank You. Soon our team will contact you.
        </div>
    )


    const contactForm = () => (
        <div >
            <div >
                <div className="col-11 col-md-9 mx-auto p-5 my-5" style={{ opacity: "0.9" }}>

                    <div className="row">
                        <div className="col-12 col-md-6 my-auto p-3">
                            <div className="col-12 col-md-6 my-auto p-3">
                                <div className="mb-4">
                                    <p className="h5 heading_color"><i className="fas fa-map-marker-alt  me-3"></i> Address:</p>
                                    <p className="">1 / 2 Asad Avenue Road, Block-A  <br /> Mohammadpur  Dhaka</p>
                                </div>
                                <hr className="my-4" />


                                <div className="mb-4">
                                    <p className="h5 heading_color"><i className="fas fa-phone me-3"></i>Phone:</p>
                                    <p className="">+8801819139975</p>
                                </div>
                                <hr className="my-4" />


                                <div className="mb-4">
                                    <p className="h5 heading_color"><i className="fas fa-envelope me-3"></i>Email:</p>
                                    <p className="">3pcommunication@gmail.com </p>
                                </div>
                                <hr className="my-4" />


                                <div className="mb-4">
                                    <p className="h5 mb-3">Connect with Us:</p>
                                    <a href="https://www.facebook.com/3PCommunication" target="_blank"  rel="noopener noreferrer">
                                        <i className="fab fa-facebook heading_color" style={{ fontSize: '30px', marginRight: '10px' }}></i>
                                    </a>
                                    <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-whatsapp heading_color" style={{ fontSize: '30px', marginRight: '10px' }}></i>
                                    </a>
                                    <a href="https://www.youtube.com/@3pcommunication569" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube heading_color" style={{ fontSize: '30px' }}></i>
                                    </a>
                                </div>
                                <hr className="text-white d-md-none" />
                            </div>



                        </div>
                        <div className="col-12 col-md-6 ContactDesign px-5">
                            <p className="h2 heading_color mt-3 text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Contact Us</p>
                            {showSuccess()}
                            <form >
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

                                <button onClick={clickSubmit} type="submit" className="my-4 col-12 btn special_button btn-lg btn-block ">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
    return (
        <div>
            <div><TopMenu /></div>
            <div>{contactForm()}</div>
            <div><Footer /></div>
        </div>
    )
}

export default Contact
