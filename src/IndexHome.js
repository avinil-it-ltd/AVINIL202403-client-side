import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import TopMenu from "./core/TopMenu"
import Footer from "./core/Footer.js"
import Data from "./projects.json"
import { Accordion, Card } from 'react-bootstrap';


import { Container, Row, Col } from "react-bootstrap"
import banner1 from '../src/assets/images/banner1.jpg'
import banner2 from '../src/assets/images/banner2.jpg'
import banner3 from '../src/assets/images/banner3.jpg'

import testimonialImage from "../src/assets/images/testimonialImage.jpg"
import design from '../src/assets/images/interior-design.png'
import ideas from '../src/assets/images/idea.png'
import delivery from '../src/assets/images/delivery.png'
import meeting from '../src/assets/images/business-meeting.png'

import inte from '../src/assets/1.png'
import india_gate from '../src/assets/india-gate.png'
import wedding from '../src/assets/wedding-ring.png'


import picture1 from '../src/assets/images/clients/Picture1.jpg'
import picture2 from '../src/assets/images/clients/Picture2.jpg'
import picture3 from '../src/assets/images/clients/Picture3.png'
import picture4 from '../src/assets/images/clients/Picture4.jpg'
import picture5 from '../src/assets/images/clients/Picture5.jpg'
import picture6 from '../src/assets/images/clients/Picture6.jpg'
import picture7 from '../src/assets/images/clients/Picture7.jpg'
import picture8 from '../src/assets/images/clients/Picture8.jpg'
import picture9 from '../src/assets/images/clients/Picture9.jpg'
import picture10 from '../src/assets/images/clients/Picture10.jpg'
import picture11 from '../src/assets/images/clients/Picture11.jpg'
import picture12 from '../src/assets/images/clients/Picture12.png'

// import './App.css';
import ContactModal from "./pages/Contact/ContactModal";
import left from "../src/assets/images/interiorPage/left.jpg"
import center from "../src/assets/images/interiorPage/center.jpg"
import right from "../src/assets/images/interiorPage/right.jpg"
import PageUpButton from "./PageUpButton/PageUpButton";
// import './custom.css'
import Banner from "./pages/Home/Banner/Banner.js";
import Introduction from "./pages/Home/Introduction/Introduction.js";
import Process from "./pages/Home/Process/Process.js";
import Services from "./pages/Home/Services/Services.js";
import Clients from "./pages/Home/Clients/Clients.js";
import ContactInfo from "./pages/Home/ContactInfo/ContactInfo.js";
import ThreeImg from "./pages/Home/ThreeImg/ThreeImg.js";
import FAQ from "./pages/Home/FAQ/FAQ.js";
import Testimonial from "./pages/Home/Testimonial/Testimonial.js";


const IndexHome = (props) => {
  const theme = '#191919'

  const [projects, setProjects] = useState([])


  const ZoomIn = styled.div`animation:3s ${keyframes`${zoomIn}`}`



  const listAllProjects = () => {
    setProjects(Data)
  }

  useEffect(() => {
    listAllProjects()
  }, [props])

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setModalShow(true);
    }, 3000)
  }, [])











  // Faq section functionality code 

  const [activeKey, setActiveKey] = useState(null);

  const toggleActiveKey = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };


  // const topCarousel = () => (
  //   <div className="position-relative bg-primary">
  //     <div className="opacity-50 carousel-shadow">
  //       <img className=" img-fluid w-100" src={banner2} alt="Banner" />
  //     </div>
  //     {/* Overlay for better text visibility */}


  //     <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
  //       {/* Large screen heading */}
  //       <h3 className="golden-text fw-bold text-white display-4 mb-3 d-none d-md-block">
  //         Welcome To 3P Communication
  //       </h3>
  //       {/* Small screen heading */}
  //       <h5 className="golden-text fw-bold fs-2 text-white mb-3 d-md-none">
  //         Welcome To 3P Communication
  //       </h5>

  //       {/* Large screen text */}
  //       <p className="golden-text text-white fw-bold text-center display-6 mb-0 d-none d-md-block">
  //         One Stop Solutions Interior & Exterior Design for Homes and Offices in Bangladesh
  //       </p>
  //       {/* Small screen text */}
  //       <p className="golden-text text-white fs-5 mb-0 d-md-none">
  //         One Stop Interior Solutions in Bangladesh
  //       </p>
  //     </div>
  //   </div>
  // );


  // const sec1 = () => (
  //   <div className="" style={{ backgroundImage: "url('/images/bg-1.jpg')", height: "auto" }}>
  //     <div className="body_background" style={{ opacity: "0.95", height: "auto" }}>
  //       <div className="row p-3">
  //         <div className="col-12 col-md-6 mx-auto ">

  //           <h2 className=" heading_color mt-5 me-2" style={{ fontFamily: "Times New Roman" }}>3P Communication Interior & Exterior Design</h2>
  //           <p className="fs-6">At 3P Communication, we prioritize collaboration in every project. Our design concepts emerge from close partnerships with our clients, ensuring a deep understanding of their goals and unique positions within the industry. Our talented team actively listens, conducts thorough research, and brings creative visions to life, crafting spaces that are not only visually stunning but also budget-conscious and practical. We are committed to delivering exceptional design solutions that meet the specific needs of each client.</p>
  //           <Link to="/interior" ><button className="btn btn-md special_button mt-2">View Interior Projects</button></Link>
  //         </div>
  //         <div className="col-10 col-md-4 mx-auto">
  //           <img src={banner1} className="rounded mt-5  imageBorder " width="100%"></img>
  //         </div>




  //         <div className="col-10 col-md-4  mx-auto">
  //           <img src={banner3} className="rounded mt-5 imageBorder" width="100%"></img>
  //         </div>
  //         <div className="col-12 col-md-6 mx-auto  mt-5">
  //           <h2 className=" mt-5 heading_color " style={{ fontFamily: "Times New Roman" }}>Design as the people it serves</h2>
  //           <p className="fs-6 ">We offer a full range of interior and exterior design services. Our focus on modern systems and detailed documentation allows us to create tailored solutions for each project. With award-winning design talent and solid project management skills, we ensure that every project is completed on time and within budget, all while maintaining high standards and attention to detail.</p>
  //           <Link to="/exterior" ><button className="btn btn-md special_button ">View Exterior Projects</button></Link>
  //         </div>

  //       </div>
  //       <br />
  //       <br />
  //     </div>
  //   </div>
  // )

  // const process = () => (
  //   <div className="mt-0 mb-5" >
  //     {/* style={{ backgroundImage: "url('/images/bg-2.jpg')", height: "auto" }} */}
  //     <div className="" style={{ opacity: "0.9", height: "auto" }}>
  //       <h1 className="text-center mt-0 p-5  heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Our Process</h1>
  //       <div className="row p-5 " >
  //         <div className="col-12 col-md-3 text-center p-2">
  //           <div className=" mx-auto   row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={ideas} alt="" /> </div>
  //           <div className="h2  text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Idea & Concept</div>
  //         </div>
  //         <div className="col-12 col-md-3 text-center p-2">
  //           <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={design} alt="" /> </div>
  //           <div className="h2 text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Design & Create</div>

  //         </div>
  //         <div className="col-12 col-md-3 text-center p-2">
  //           <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}><img src={meeting} alt="" /></div>
  //           <div className="h2  text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Meet & Agree</div>


  //         </div>
  //         <div className="col-12 col-md-3 text-center p-2">
  //           <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}><img src={delivery} alt="" /></div>
  //           <div className="h2  text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Deliver & Install</div>

  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )


  // const ourServices = () => (
  //   <div className="servicebg">
  //     <div className="service-content py-5">
  //       <div className="text-center h2 text-white py-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
  //         <h2>Explore Our Services</h2>
  //       </div>

  //       <div className="row p-4 pb-5">
  //         <div className="col">
  //           <div className="text-center ">
  //             <img src={inte} className="imageBorder  p-2 bg-white" width="200px" height="150px" alt="Event" />
  //           </div>
  //           <div className="text-center h4 text-white p-2" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
  //             Interior
  //           </div>
  //         </div>
  //         <div className="col">
  //           <div className="text-center">
  //             <img src={india_gate} className="imageBorder  p-2 bg-white" width="200px" height="150px" alt="Event" />
  //           </div>
  //           <div className="text-center h4 text-white p-2" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
  //             Exterior
  //           </div>
  //         </div>
  //         <div className="col">
  //           <div className="text-center">
  //             <img src={wedding} className="imageBorder  p-2 bg-white" width="200px" height="150px" alt="Event" />
  //           </div>
  //           <div className="text-center h4 text-white p-2" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
  //             Event
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



  // const callNow = () => (
  //   <div className="w-100 bg-dark my-5 py-5">
  //     <div className="d-flex flex-column flex-md-row justify-content-around align-items-center text-center text-md-start text-black fw-bolder px-3 px-md-5 callNow_font">

  //       {/* Column 1 - Text */}
  //       <div className="col-md-4 mb-3 mb-md-0 text-white">
  //         <h3>CONTACT NOW FOR YOUR DREAM INTO REALITY</h3>
  //       </div>

  //       {/* Column 2 - Phone Number with Icon */}
  //       <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-center">
  //         <div className="d-flex align-items-center justify-content-center">
  //           <div className="icon-circle">
  //             <i className="bi bi-telephone-fill"></i> {/* Bootstrap phone icon */}
  //           </div>
  //           <div className="px-3 pt-3">
  //             <p className="text-warning"> CALL US<br /><span className="text-white"> +88015846895</span> </p>
  //             <p className="ms-2 fw-bold"></p>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Column 3 - Email with Icon */}
  //       <div className="col-md-4 d-flex align-items-center justify-content-center">
  //         <div>

  //           <div className="d-flex align-items-center justify-content-center">
  //             <div className="icon-circle">
  //               <i className="bi bi-envelope-fill"></i> {/* Bootstrap envelope icon */}
  //             </div>
  //             <div className="px-3 pt-3">
  //               <p className="text-warning">PLEASE SEND EMAIL<br /> <span className="fw-bold text-white">info@example.com</span></p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //     </div>
  //   </div>
  // );






  // const OurClients = () => (
  //   <Container>
  //     <div className="container my-5 py-5">
  //       <h2 className="text-center mb-2 fs-4 heading_color">Our Clients</h2>
  //       <h1 className="text-center mb-5 callNow_font" style={{ fontFamily: "Times New Roman" }}>
  //         We have worked with great people
  //       </h1>

  //       {/* Scrollable row of clients */}
  //       <div className="client-scroll">
  //         <div className="client-row ">
  //           {[picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8, picture9, picture10, picture11, picture12].map((pic, index) => (
  //             <div key={index} className="client-item">
  //               <img src={pic} alt={`Client ${index + 1}`} className="client-image mx-2" />
  //             </div>
  //           ))}
  //         </div>
  //       </div>


  //     </div>
  //   </Container>
  // );




  // const ThreeImgSection = () => (

  //   <Container className="my-5 py-5">
  //     <Row>
  //       <Col md={4} className="mb-4">
  //         <div className="image-container">
  //           <img
  //             src={left}
  //             alt="Example 1"
  //             className="img-fluid"
  //           />
  //           <div className="overlay-text">
  //             <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }}>Interior Design For The Future</h2>
  //           </div>
  //         </div>
  //       </Col>


  //       <Col md={4} className="mb-4">
  //         <div className="image-container">
  //           <img
  //             src={center}
  //             alt="Example 2"
  //             className="img-fluid"
  //           />
  //           <div className="overlay-text ms-4 ps-4">
  //             <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }}>Lots Of Flexible Functionalities </h2>
  //           </div>
  //         </div>
  //       </Col>


  //       <Col md={4} className="mb-4">
  //         <div className="image-container">
  //           <img
  //             src={right}
  //             alt="Example 3"
  //             className="img-fluid"
  //           />
  //           <div className="overlay-text">
  //             <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }}>Introduce Vision To Your Space</h2>
  //           </div>
  //         </div>
  //       </Col>
  //     </Row>
  //   </Container>

  // )

  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://3pcommunicationsserver.vercel.app/api/testimonials'); // Adjust the endpoint as needed
        const data = await response.json();
        setTestimonialsData(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);



  const testimoni = () => (
    <Container>
      <section className="testimonial-section py-5  bg-white position-relative">
        <div className="container pb-5 mb-5">
          <div className="row  mb-5">
            {/* Left Section with Image and Text */}
            <div className="col-lg-6" data-aos="zoom-in-left">
              <img
                src={testimonialImage}
                alt="Testimonial Section"
                className="img-fluid rounded-lg"
              />
            </div>

            {/* Right Heading, Paragraph, and Button */}
            <div className="col-lg-6 p-3" data-aos="fade-up">
              <h2 className="display-4 pt-5 font-weight-bold">Discover Client Experiences</h2>
              <p className="text-muted mb-5">
                Our clients consistently praise our commitment to quality and service.
                Join the growing list of satisfied clients who trust us for their meeting needs.
              </p>
              <Link to="/interior"><button className="btn dashboard_all_button text-white fw-bold px-5 py-2"> Explore The Projectrs</button></Link>
            </div>
          </div>

          {/* Testimonial Cards at Bottom Right */}
          <div className="testimonial-carousel-wrapper">
            <div className="testimonial-carousel">
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className="card bg-white  testimonial-card border-0 mx-3 p-3 shadow-sm">
                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="rounded-circle mr-3"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div className="ps-3">
                      <h6 className="mb-1">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.designation}</small>
                    </div>
                  </div>
                  <p className="mt-3 text-muted">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );

















  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('https://3pcommunicationsserver.vercel.app/api/faqs'); // Adjust the endpoint as needed
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);




  const faq = () => (
    <Container className="my-5 py-5">
      <Row className="align-items-center">
        {/* FAQ Section */}
        <Col lg={6} className="my-5 py-5 px-4">
          <h2 className="heading_color mb-4" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Frequently Asked Questions</h2>
          <Accordion activeKey={activeKey}>
            {faqs.map((faq, index) => (
              <Card key={index} className="mb-3">
                <Card.Header
                  onClick={() => toggleActiveKey(index)}
                  className="d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                >
                  <h6 className="mb-0 py-2">
                    <span
                      style={{
                        color: activeKey === index ? 'black' : 'black', // Orange when active, default color otherwise
                        textDecoration: 'none',
                        fontWeight: activeKey === index ? 'bold' : 'normal'
                      }}
                    >
                      {faq.question}
                    </span>
                  </h6>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>{faq.answer}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Col>

        {/* Right Side Image */}
        <Col lg={6}>
          <div className="text-center ">
            <img
              src={right} // Replace with your desired image link
              alt="FAQ Illustration"
              className="w-100 "
              style={{ borderRadius: '10px' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )




  return (
    <div className="" >
      <div><TopMenu /></div>

      <div className="">
        {/* <div>{topCarousel()}</div> */}
        <Banner/>
        <Introduction/>
        {/* <div>{process()}</div> */}
        <Process/>
        {/* <div>{ourServices()}</div> */}
        <Services/>
        {/* <div>{OurClients()}</div> */}
        <Clients/>

        {/* <div>{callNow()}</div> */}
        <ContactInfo/>
        {/* <div>{ThreeImgSection()}</div> */}
        <ThreeImg/>
        {/* <div>{testimonials()}</div> */}
        {/* <div>{testimoni()}</div> */}
        <Testimonial/>
        {/* <div>{faq()}</div> */}
        <FAQ/>
        <br /><br />
        <div>{PageUpButton}</div>
        <div id="contact"><Footer /></div>


        {/* <ContactModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}

      </div>
    </div>
  )
}

export default IndexHome
