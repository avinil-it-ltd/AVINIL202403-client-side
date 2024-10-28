import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

function ContactModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [interest, setInterest] = useState("");
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contacts"); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch contact details");
        }
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const clickSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNo,
          message: interest,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you. Our team will contact you soon.",
          confirmButtonColor: "#28a745",
        });
        setName("");
        setEmail("");
        setPhoneNo("");
        setInterest("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const contactForm = () => (
    <div className="modal_design py-3">
      <div className="col-6 col-md-9 mx-auto" style={{ opacity: "0.9" }}>
        <div className="row">
          <div className="col-12">
            <p className="h2 text-danger text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
              Contact Us
            </p>
            {loading ? (
              <p>Loading contact details...</p>
            ) : contactDetails ? (
              <>
                <p className="text-center">{contactDetails.address}</p>
                <p className="text-center">{contactDetails.mobile}</p>
                <p className="text-center">{contactDetails.email}</p>
              </>
            ) : (
              <p className="text-center">Contact details not available</p>
            )}
            <form onSubmit={clickSubmit}>
              <div className="form-group mb-2">
                <label className="text-danger">Name:</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control col-6"
                  value={name}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="text-danger">Email:</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control col-6"
                  value={email}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="text-danger">Phone No:</label>
                <input
                  onChange={(e) => setPhoneNo(e.target.value)}
                  type="text"
                  className="form-control col-6"
                  value={phoneNo}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="text-danger">Message:</label>
                <textarea
                  rows="4"
                  onChange={(e) => setInterest(e.target.value)}
                  className="form-control col-6"
                  value={interest}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-3 col-12 btn special_button btn-lg btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal {...props} className="modal_size" size="lg" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div>{contactForm()}</div>
      </Modal.Body>
    </Modal>
  );
}

export default ContactModal;
