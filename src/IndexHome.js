import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import TopMenu from "./core/TopMenu"
import Footer from "./core/footer"
import Data from "./projects.json"

import {  Container, Row, Col } from "react-bootstrap"
import eventImage from '../src/assets/images/event'
import banner1 from '../src/assets/images/banner1.jpg'
import banner2 from '../src/assets/images/banner2.jpg'
import banner3 from '../src/assets/images/banner3.jpg'
import exteriorImage from '../src/assets/images/exterior.jpg'
import InteriordesignPic from '../src/assets/images/interiorp.jpg'


import design from '../src/assets/images/interior-design.png'
import ideas from '../src/assets/images/idea.png'
import delivery from '../src/assets/images/delivery.png'
import meeting from '../src/assets/images/business-meeting.png'




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

import './App.css';
import ContactModal from "./ContactModal";
import left from "../src/assets/images/interiorPage/left.jpg"
import center from "../src/assets/images/interiorPage/center.jpg"
import right from "../src/assets/images/interiorPage/right.jpg"



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











  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderWrapperRef = useRef(null);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const autoSlideInterval = useRef(null);

  const testimonial = [
    { name: "Alice", review: "I am beyond thrilled with the transformation of my living room. The design team brought my vision to life and exceeded my expectations. Highly recommend their services!" },
    { name: "Bob", review: "The designers were professional and attentive to our needs. Our office space is now both functional and aesthetically pleasing. Thank you for your outstanding work!" },
    { name: "Charlie", review: "We hired the company to redesign our kitchen, and we couldn't be happier with the results. The attention to detail and creativity were exceptional. Our kitchen looks amazing!" },
    { name: "David", review: "The team did an incredible job with our home renovation. They made sure to incorporate our preferences while adding their unique touch. We love our new space!" },
    { name: "Eve", review: "From start to finish, the process was seamless and enjoyable. The designers are talented, professional, and easy to work with. Our home feels like a dream come true!" },
    { name: "Frank", review: "I was impressed by the level of expertise and creativity. The designers turned our outdated space into a modern, stylish home. We receive compliments from everyone who visits!" },
    { name: "Grace", review: "The team took our small apartment and made it feel spacious and luxurious. Their innovative solutions and attention to detail made all the difference. Highly recommend!" },
    { name: "Hannah", review: "Working with the company was a fantastic experience. They listened to our ideas and provided valuable insights. Our home is now a perfect blend of comfort and elegance." },
    { name: "Ivy", review: "The designers were able to capture our style and preferences perfectly. Our renovated home is beautiful and functional. We couldn't be happier with the results!" },
    { name: "Jack", review: "The company's designers are true professionals. They transformed our home with creativity and precision. The project was completed on time and within budget. Highly satisfied!" },
    { name: "Kevin", review: "We are thrilled with the design of our new home. The team was attentive, responsive, and incredibly talented. Our home feels like a luxurious retreat thanks to their work!" }
  ];



  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setSlidesPerView(4);
    } else if (width >= 768) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  const updateSliderPosition = () => {
    const slideWidth = sliderWrapperRef.current.clientWidth / slidesPerView;
    sliderWrapperRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : testimonial?.length - slidesPerView);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex < testimonial?.length - slidesPerView ? currentIndex + 1 : 0);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  useEffect(() => {
    updateSliderPosition();
  }, [currentIndex, slidesPerView]);

  useEffect(() => {
    autoSlideInterval.current = setInterval(nextSlide, 3000);
    return () => clearInterval(autoSlideInterval.current);
  }, [currentIndex]);



  const topCarousel = () => (
    <div className="relative carousel-shadow">
      <img className="img-fluid" src={banner2} alt="Banner" />
      <div className="carousel-caption absolute d-none d-md-block display-1">
        <h3>Welcome To 3P Communication</h3>
        <p>Best platform to hire designers in Bangladesh</p>
      </div>
    </div>
  );


  const sec1 = () => (
    <div className="" style={{ backgroundImage: "url('/images/bg-1.jpg')", height: "auto" }}>
      <div className="body_background" style={{ opacity: "0.95", height: "auto" }}>
        <div className="row p-3">
          <div className="col-12 col-md-6 mx-auto ">

            <h1 className=" heading_color my-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Urabbo interior Designer</h1>
            <p className="">Every Urabbo concept evolves from a close collaboration between our team and our clients – a process predicated upon our having a firm understanding of both our client’s objectives and their unparalleled position within the hospitality industry. talented team listens, researches, synthesizes and ultimately implements a creative vision that is aesthetically compelling, budget and deadline compliant, and above all, speaks strategically to a project’s unique place and program.</p>
            <Link to="/projects" ><button className="btn btn-md special_button mt-2">View All Projects</button></Link>
          </div>
          <div className="col-10 col-md-4 mx-auto">
            <img src={banner1} className="rounded mt-5  imageBorder " width="100%"></img>
          </div>




          <div className="col-10 col-md-4  mx-auto">
            <img src={banner3} className="rounded mt-5 imageBorder" width="100%"></img>
          </div>
          <div className="col-12 col-md-6 mx-auto text-end mt-5">
            <h1 className="text-end mt-5 heading_color " style={{ fontFamily: "'Aref Ruqaa', serif" }}>design as the people it serves</h1>
            <p className=" ">Provides discriminating clients with a comprehensive range of design services and skills. By focusing-time and energy on development of state-of-the-art systems, exacting specifications and documentation, In creates innovative design solutions for every project. Complementing award-winning design talent is sound technical expertise, as well as a practical approach to project management. During each phase of the project, from initial concept, through design development, to final installation, Seeks to distinguish their work through rigorous attention to detail high standards and meticulous follow-through. Supported by exceptional project management teams, Ensures that each project is completed on time and within budget.</p>
            <Link to="/projects" ><button className="btn btn-md special_button ">View All Projects</button></Link>
          </div>

        </div>
        <br />
        <br />
      </div>
    </div>
  )

  const process = () => (
    <div className="mt-0 mb-5" >
      {/* style={{ backgroundImage: "url('/images/bg-2.jpg')", height: "auto" }} */}
      <div className="" style={{ opacity: "0.9", height: "auto" }}>
        <h1 className="text-center mt-0 p-5  heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Our Process</h1>
        <div className="row p-5 " >
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto   row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={ideas} alt="" /> </div>
            <div className="h2  text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Idea & Concept</div>
          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={design} alt="" /> </div>
            <div className="h2 text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Design & Create</div>

          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}><img src={meeting} alt="" /></div>
            <div className="h2  text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Meet & Agree</div>

          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}><img src={delivery} alt="" /></div>
            <div className="h2  text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Deliver & Install</div>

          </div>
        </div>
      </div>
    </div>
  )

  const ourServices = () => (
    <div className="ourServiceDesign ">
      {/* style={{ backgroundImage: "url('/images/bg-5.jpg')", }} */}
      <div className=" py-5 " style={{ opacity: "0.9" }}>
        {/* body_background */}
        <div className="text-center h2 heading_color py-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}><h2>Our Services</h2></div>
        <div className="row p-4 pb-5">
          <div className="col">

            <div className="text-center "><img src={eventImage} className="imageBorder" width="350px" height="250px"></img></div>
            <div className="text-center  h4 text-danger p-2 " style={{ fontFamily: "'Aref Ruqaa', serif", textDecoration: " " }}>
              Event
            </div>

          </div>
          <div className="col">

            <div className="text-center "><img src={exteriorImage} className="imageBorder" width="350px" height="250px"></img></div>
            <div className="text-center h4 text-danger p-2" style={{ fontFamily: "'Aref Ruqaa', serif", textDecoration: " #ffc107" }}>
              Exterior
            </div>
          </div>
          <div className="col">

            <div className="text-center "><img src={InteriordesignPic} className="imageBorder" width="350px" height="250px"></img></div>
            <div className="text-center h4 text-danger p-2" style={{ fontFamily: "'Aref Ruqaa', serif", textDecoration: " " }}>
              Interior</div>
          </div>
        </div>
      </div>
    </div>
  )



  const callNow = () => (
    <div className="w-100 nav_bar my-5 py-5">
        <div className="text-center  text-white fw-bolder px-3 px-md-5 callNow_font mb-3 mb-md-0">
          <h3 className="moving-text ">CALL NOW FOR YOUR DREAM INTO REALITY</h3>
        </div>
        <div className="text-center px-3 px-md-5 callNow_font">
          <button className="border-0 px-5 btn btn-light p-3">+88015846895</button>
        </div>
    </div>
  );




  const OurClients = () => (
    <div className="container my-5 py-5 ">
      <h2 className="text-center mb-2 fs-4 heading_color">Our Clients</h2>
      <h1 className="text-center mb-5 callNow_font heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>We have worked with great people</h1>

      <div className="row">
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture1} alt="Client 1" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture2} alt="Client 2" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture3} alt="Client 3" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture4} alt="Client 4" className=" " />
        </div>
      </div>

      <div className="row">
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture5} alt="Client 1" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture6} alt="Client 2" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture7} alt="Client 3" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture8} alt="Client 4" className=" " />
        </div>
      </div>

      <div className="row">
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture9} alt="Client 1" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture10} alt="Client 2" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture11} alt="Client 3" className=" " />
        </div>
        <div className="col-6 col-md-3 text-center mb-4">
          <img width=" 200px" height="150px " src={picture12} alt="Client 4" className=" " />
        </div>
      </div>

    </div>
  );


  

  const ThreeImgSection = () => (

    <Container className="my-5 py-5">
      <Row>
        <Col md={4} className="mb-4">
          <div className="image-container">
            <img
              src={left}
              alt="Example 1"
              className="img-fluid"
            />
            <div className="overlay-text">
              <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }}>Interior Design For The Future</h2>
            </div>
          </div>
        </Col>


        <Col md={4} className="mb-4">
          <div className="image-container">
            <img
              src={center}
              alt="Example 2"
              className="img-fluid"
            />
            <div className="overlay-text ms-4 ps-4">
              <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }}>Lots Of Flexible Functionalities </h2>
            </div>
          </div>
        </Col>


        <Col md={4} className="mb-4">
          <div className="image-container">
            <img
              src={right}
              alt="Example 3"
              className="img-fluid"
            />
            <div className="overlay-text">
              <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }}>Introduce Vision To Your Space</h2>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

  )




  const testimonials = () => (

    <div>
      <h2 style={{ fontFamily: "'Aref Ruqaa', serif" }} className="text-center my-5  fs-3  heading_color">Our Clients Say</h2>

      <div className="slider-container container mx-auto">
        <div className="slider-wrapper d-flex" ref={sliderWrapperRef}>

          {testimonial.map((t, index) => (
            <div className="slide  " key={index} style={{ flex: `0 0 ${100 / slidesPerView}%` }}>
              <div>
                <p className="card card_style mx-3 py-4 px-4 ">
                  <span className="fw-bold">{t?.name}</span>
                  <span>" {t?.review} " </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-controls ">
          <button className="prev special_button" onClick={prevSlide}>Prev</button>
          <button className="next me-3 special_button" onClick={nextSlide}>Next</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="g-0" style={{ maxWidth: "100vw" }}>
      <div><TopMenu /></div>

      <div className="container-fluid body_background ">
        <div>{topCarousel()}</div>
        <div>{sec1()}</div>
        <div>{process()}</div>
        <div>{ourServices()}</div>
        <div>{callNow()}</div>
        <div>{OurClients()}</div>
        <div>{ThreeImgSection()}</div>
        <div>{testimonials()}</div>
        <br /><br />
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
