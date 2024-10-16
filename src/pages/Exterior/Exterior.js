import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopMenu from "../../core/TopMenu";
import Footer from "../../core/footer";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // To navigate between pages
import '../../App.css';
import './Exterior.css';
import bioImg from "../../../src/assets/images/Exterior/bioImg.jpg";
import axios from 'axios'; // Import axios to make API requests

const Exterior = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(true);


  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/projects'); // Assuming your API route is '/api/projects'
        const exteriorProjects = response.data.projects.filter(project => project.category.toLowerCase() === 'exterior design')

        setProjects(exteriorProjects);
        console.log(exteriorProjects.filter(project => project.category.toLowerCase() === 'exterior design'));
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
          <h2 className="heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Example Heading</h2>
          <p className="my-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet consectetur dolor in elementum. Nulla vehicula lorem nec neque scelerisque, a malesuada risus aliquet.
          </p>
          <button className="BioButton mt-5 pt-5">Read More ...</button>
        </Col>
      </Row>
    </Container>
  );

  const ProjectSection = () => (
    <div className="container mb-5 pb-5">
      <h1 className="my-5 py-5"><span className="bigText">Exterior</span> <span className="smallText">Projects</span></h1>

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
              <p>Exterior Design</p>
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
        <div>{ProjectSection()}</div>
        <div id="contact"><Footer /></div>
      </div>
    </div>
  );
};

export default Exterior;
