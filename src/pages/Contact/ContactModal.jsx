import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { Modal, Button } from "react-bootstrap"


function ContactModal(props) {

  const theme = '#191919'
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [interest, setInterest] = useState("")
  const [success, setSuccess] = useState(false)

  var templateParams = {
    name: name,
    email: email,
    phoneNo: phoneNo,
    message: interest
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    emailjs.send('service_lbmx95i', 'template_5nhl4y6', templateParams, 'dfTY7TgQqsuNivbMT')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });

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
    <div  className="modal_design py-3" > 
    {/* style={{ backgroundImage: "url('/images/bg-2.jpg')" }} */}
      <div >
        <div  className="col-6 col-md-9 mx-auto" style={{  opacity: "0.9" }}>

          <div className="row">
            {/* <div className="col-12 col-md-6 my-auto p-3">
              <p className="h1 text-center " style={{ fontFamily: "'Aref Ruqaa', serif" }}>Our Expertise , Your Lifestyle</p>
              <hr className="text-white d-md-none" />

            </div> */}
            <div className="">
              <p className="h2 text-danger text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Contact Us</p>
              {showSuccess()}
              <form >
                <div className="form-group mb-2">
                  <label className="text-danger">Name:</label>
                  <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control col-6" value={name} required></input>
                </div> 
                <div className="form-group mb-2">
                  <label className="text-danger">Email:</label>
                  <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="form-control col-6" value={email} required></input>
                </div>
                <div className="form-group mb-2">
                  <label className="text-danger">Phone No:</label>
                  <input onChange={(e) => { setPhoneNo(e.target.value) }} type="text" className="form-control col-6" value={phoneNo} required></input>
                </div>
                <div className="form-group mb-2">
                  <label className="text-danger">Message:</label>
                  <textarea rows="4" onChange={(e) => { setInterest(e.target.value) }} type="text" className="form-control col-6" value={interest} required></textarea>
                </div>

                <button onClick={clickSubmit} type="submit" className="mt-3 col-12 btn special_button btn-lg btn-block ">Submit</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )

  return (
    <Modal
  {...props}
  className="modal_size"
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
  </Modal.Header>
  <Modal.Body>
    <div>{contactForm()}</div>
  </Modal.Body>
</Modal>

  );
}

export default ContactModal
