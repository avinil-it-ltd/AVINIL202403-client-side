import React, { useRef, useState } from "react";
import TopMenu from "../../core/TopMenu";
import Footer from "../../core/footer";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import emailjs from "@emailjs/browser";
import "../../custom.css";

const Contact = () => {
  const form = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send email via EmailJS
    emailjs
      .sendForm(
        "service_rfglm0j",
        "template_xw5djha",
        form.current,
        "CcJ1VlAXaHKwG_Dbg"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
        },
        (error) => {
          console.log("Email error:", error.text);
        }
      );

    // Submit form data to backend
    try {
      const response = await axios.post(
        "https://3pcommunicationsserver.vercel.app/api/contacts",
        {
          name,
          email,
          phoneNumber,
          message,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you. Our team will contact you soon.",
          position: "center", // Centered Swal
          showConfirmButton: true,
          confirmButtonColor: "#28a745", // Custom green button color
        });

        // Reset form fields
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      }
    } catch (err) {
      console.error("Backend error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        position: "center", // Centered Swal
        showConfirmButton: true,
        confirmButtonColor: "#d33", // Custom red button color
      });
    }
  };

  const contactForm = () => (
    <div>
      <div
        className="col-11 col-md-9 mx-auto p-5 my-5"
        style={{ opacity: "0.9" }}
      >
        <div className="row">
          {/* Left Side: Contact Info Section */}
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
                <a
                  href="https://www.facebook.com/3PCommunication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heading_color me-3"
                >
                  <i
                    className="fab fa-facebook"
                    style={{ fontSize: "30px" }}
                  ></i>
                </a>
                <a
                  href="https://wa.me/yourwhatsappnumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heading_color me-3"
                >
                  <i
                    className="fab fa-whatsapp"
                    style={{ fontSize: "30px" }}
                  ></i>
                </a>
                <a
                  href="https://www.youtube.com/@3pcommunication569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heading_color"
                >
                  <i
                    className="fab fa-youtube"
                    style={{ fontSize: "30px" }}
                  ></i>
                </a>
              </div>
            </div>
            <hr className="text-white d-md-none" />
          </div>

          {/* Right Side: Contact Form */}
          <div className="col-12 col-md-6 ContactDesign px-5">
            <p
              className="h2 heading_color mt-3 text-center"
              style={{ fontFamily: "'Aref Ruqaa', serif" }}
            >
              Contact Us
            </p>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-dark my-1">Name:</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control col-12"
                  value={name}
                  name="form_name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-dark my-1">Email:</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control col-12"
                  value={email}
                  name="form_email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-dark my-1">Phone No:</label>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  className="form-control col-12"
                  value={phoneNumber}
                  name="form_phoneNumber"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-dark my-1">Message:</label>
                <textarea
                  rows="4"
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control col-12"
                  value={message}
                  name="message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="my-4 col-12 btn special_button btn-lg btn-block"
                value="Send"
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
    <div>
      <TopMenu />
      <div>{contactForm()}</div>
      <Footer />
    </div>
  );
};

export default Contact;
