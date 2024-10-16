// import React, { useState, useEffect } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import TopMenu from "../../core/TopMenu";
// import Footer from "../../core/footer";
// import Data from "../../projects.json";
// import { Container, Col, Row } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom'; // To navigate between pages
// import '../../../src/App.css';
// import './interior.css'
// import bioImg from "../../../src/assets/images/Exterior/bioImg.jpg";
// import img1 from "../../../src/assets/images/Exterior/Cantonment School Gate.jpg";
// import img2 from "../../../src/assets/images/Exterior/Navana Pipe plactics Factory Gate.jpg";
// import img3 from "../../../src/assets/images/Exterior/Rajarbahg Gate.jpg";
// import img4 from "../../../src/assets/images/Exterior/Soinik Club Gate.jpg";

// const Interiror = (props) => {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate(); // For navigation

//   // Sample project data
//   const projectData = [
//     { id: 1, imageUrl: img1, title: 'Cantonment School Gate', details: 'School entrance gate design...' },
//     { id: 2, imageUrl: img2, title: 'Navana Pipe Plastics Factory Gate', details: 'Factory gate with industrial design...' },
//     { id: 3, imageUrl: img3, title: 'Rajarbagh Gate', details: 'Rajarbagh gate design in modern style...' },
//     { id: 4, imageUrl: img4, title: 'Soinik Club Gate', details: 'Gate design for the Soinik Club...' },
//     // Add more project data as needed
//   ];

//   const listAllProjects = () => {
//     setProjects(Data);
//   };
// console.log(projects);

//   useEffect(() => {
//     listAllProjects();
//   }, [props]);

//   const handleMoreDetails = (id, project) => {
//     // Navigate to the project details page
//     navigate(`/details/${id}`);
//   };

//   const BioSection = () => (
//     <Container className="my-5 py-5">
//       <Row>
//         <Col md={6}>
//           <img src={bioImg} alt="Example" className="img-fluid" />
//         </Col>
//         <Col className="ps-5 pt-5" md={6}>
//           <h2 className="heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Example Heading</h2>
//           <p className="my-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet consectetur dolor in elementum. Nulla vehicula lorem nec neque scelerisque, a malesuada risus aliquet.
//           </p>
//           <button className="BioButton mt-5 pt-5">Read More ...</button>
//         </Col>
//       </Row>
//     </Container>
//   );

//   const ProjectSection = () => (
//     <div className="container mb-5 pb-5">
//       <h1 className="my-5 py-5"><span className="bigText">Interior</span> <span className="smallText">Projects</span></h1>

//       <div className="row g-4">
//         {projectData.map((project) => (
//           <div key={project.id} className="col-lg-4 col-md-6">
//             <div className="image-item">
//               <img src={project.imageUrl} alt={project.title} className="img-fluid" />

//               <div className="overlay">
//                 <div className="overlay-text">
//                   <button onClick={() => handleMoreDetails(project.id, project)} className="more-details-btn">
//                     More Details
//                   </button>
//                 </div>
//               </div>

//             </div>
//             <div className="imageTitle">
//               <h3 className="text-capitalize fs-5">{project.title}</h3>
//               <p>Exterior Design</p> {/* Default title under the image */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="g-0 body_background" style={{ maxWidth: "100vw" }}>
//       <div><TopMenu /></div>
//       <div className="container-fluid">
//         <div>{BioSection()}</div>
//         <div>{ProjectSection()}</div>
//         <div id="contact"><Footer /></div>
//       </div>
//     </div>
//   );
// };

// export default Interiror;


import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopMenu from "../../core/TopMenu";
import Footer from "../../core/footer";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // To navigate between pages
import '../../App.css';
import './interior.css';
import bioImg from "../../../src/assets/images/Exterior/bioImg.jpg";
import axios from 'axios'; // Import axios to make API requests

const Interior = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Fetch interior projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects'); // Assuming your API route is '/api/projects'
        const interiorProjects = response.data.projects.filter(project => project.category.toLowerCase() === 'interior design');
        
        setProjects(interiorProjects);
        console.log(interiorProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleMoreDetails = (id) => {
    navigate(`/details/${id}`); // Navigate to the project details page
  };

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
        <div>{ProjectSection()}</div>
        <div id="contact"><Footer /></div>
      </div>
    </div>
  );
};

export default Interior;
