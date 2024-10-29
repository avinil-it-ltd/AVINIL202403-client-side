
import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopMenu from "../../core/TopMenu";
import Footer from "../../core/Footer";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // To navigate between pages
import '../../App.css';
import './interior.css';
import bioImg from "../../../src/assets/images/interiorPage/bioImg.jpg";
import axios from 'axios'; // Import axios to make API requests

const Interior = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(true);

  // Fetch interior projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/projects'); // Assuming your API route is '/api/projects'
        const interiorProjects = response.data.projects.filter(project => project.category.toLowerCase() === 'interior design');
        
        setProjects(interiorProjects);
        console.log(interiorProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally{
        setLoading(false)
      }
    };

    fetchProjects();
  }, []);

  const handleMoreDetails = (id) => {
    navigate(`/details/${id}`); // Navigate to the project details page
  };



  
// State to hold contact details, loading, and error
const [contactDetails, setContactDetails] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchContactDetails = async () => {
    try {
      const response = await fetch("https://3pcommunicationsserver.vercel.app/api/myContact"); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error("Failed to fetch contact details");
      }
      const data = await response.json();
      setContactDetails(data); // Set contact details
    } catch (error) {
      console.error("Error fetching contact details:", error);
      setError("Failed to load contact details.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  fetchContactDetails();
}, []); // Empty dependency array to run only once




  // Custom Loader JSX
  const Loader = () => (
    <div className="loader-container">
        <div className="custom-loader"></div>
    </div>
);

if (loading) {
    return <Loader />; // Use your custom loader here
}


  const BioSection = () => (
    <Container className="my-5 py-5">
      <Row>
        <Col md={6}>
          <img src={bioImg} alt="Example" className="img-fluid" />
        </Col>
        <Col className="ps-5 pt-5" md={6}>
          <h2
            className="heading_color"
            style={{ fontFamily: "'Aref Ruqaa', serif" }}
          >
            {" "}
            Our Interior Projects
          </h2>
          <p style={{ fontFamily: "'Aref Ruqaa', serif" }}>
            Transforming Spaces into Homes
          </p>
          <p className="my-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
            At{" "}
            <span style={{ color: "#FFB300", fontWeight: "bold" }}>
              3P Communication
            </span>
            , we believe that every space tells a story. Our interior design
            projects are meticulously crafted to enhance the beauty and
            functionality of your home or office. From contemporary designs to
            timeless classics, our team of expert designers works closely with
            clients to bring their visions to life.
          </p>
        </Col>
      </Row>
    </Container>
  );

const callNow = () => (
  <div className="w-100 bg-dark my-5 py-5">
    <div className="d-flex flex-column flex-md-row justify-content-around align-items-center text-center text-md-start text-black fw-bolder px-3 px-md-5 callNow_font">

      {/* Column 1 - Text */}
      <div className="col-md-4 mb-3 mb-md-0 text-white">
        <h3>CONTACT NOW FOR YOUR DREAM INTO REALITY</h3>
      </div>

      {/* Column 2 - Phone Number with Icon */}
      <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center">
          <div className="icon-circle">
            <i className="bi bi-telephone-fill"></i> {/* Bootstrap phone icon */}
          </div>
          <div className="px-3 pt-3">
            <p className="text-warning"> CALL US<br />
              <span className="text-white"> {contactDetails ? contactDetails?.mobile : "+880000000000"}</span>
            </p>
            <p className="ms-2 fw-bold"></p>
          </div>
        </div>
      </div>

      {/* Column 3 - Email with Icon */}
      <div className="col-md-4 d-flex align-items-center justify-content-center">
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="icon-circle">
              <i className="bi bi-envelope-fill"></i> {/* Bootstrap envelope icon */}
            </div>
            <div className="px-3 pt-3">
              <p className="text-warning">PLEASE SEND EMAIL<br />
                <span className="fw-bold text-white">{contactDetails ? contactDetails?.email : "info@example.com"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);




  const ProjectSection = () => (
    <div className="container mb-5 pb-5">
      <h1 className="my-5 py-5"><span className="bigText">Interior</span> <span className="smallText">Projects</span></h1>

      <div className="row g-4">
        {projects.map((project) => (
          <div key={project._id} className="col-lg-4 col-md-6">
            <div className="image-item">
              <img src={project.mainImage} alt={project.title} className="img-fluid" />

              <div className="overlay">
                <div className="overlay-text">
                  <button onClick={() => handleMoreDetails(project._id)} className="more-details-btn">
                    More Details
                  </button>
                </div>
              </div>
            </div>
            <div className="imageTitle">
              <h3 className="text-capitalize fs-5">{project.title}</h3>
              <p>Interior Design</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="g-0 body_background" style={{ maxWidth: "100vw" }}>
      <div><TopMenu /></div>
      <div className="container-fluid">
        <div>{BioSection()}</div>
        <div>{callNow()}</div>
        <div>{ProjectSection()}</div>
        <div id="contact"><Footer /></div>
      </div>
    </div>
  );
};

export default Interior;
