import React,{useState,useEffect,useRef} from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { zoomIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import TopMenu from "./core/TopMenu"
import Footer from "./core/footer"
import Data from "./projects.json"
import {Container, Col, Row} from "react-bootstrap"
import './App.css';
import bioImg from "../src/assets/images/Exterior/bioImg.jpg"
import img1 from "../src/assets/images/Exterior/Cantonment School Gate.jpg"
import img2 from "../src/assets/images/Exterior/Navana Pipe plactics Factory Gate.jpg"
import img3 from "../src/assets/images/Exterior/Rajarbahg Gate.jpg"
import img4 from "../src/assets/images/Exterior/Soinik Club Gate.jpg"

const Architecture=(props)=>{
    const theme='#191919'
    const [projects,setProjects]=useState([])


    const ZoomIn=styled.div`animation:3s ${keyframes`${zoomIn}`}`



    const listAllProjects=()=>{
        setProjects(Data)
     }

     useEffect(()=>{
      listAllProjects()
    },[props])


  
    const projectData = [
      { id: 1, imageUrl: img1 , title: 'Cantonment School Gate', details: '   ' },
      { id: 2, imageUrl: img2 , title: 'Navana Pipe plactics Factory Gate', details: '   ' },
      { id: 3, imageUrl: img3, title: 'Rajarbahg Gate', details: '   ' },
      { id: 4, imageUrl: img4 , title: 'Soinik Club Gate', details: '   ' },
      // Add more project data as needed
    ];
  
  
  
  
    const BioSection = () => (
      <Container className="my-5 py-5">
        <Row>
          <Col md={6}>
            <img
              src={bioImg}
              alt="Example"
              className="img-fluid"
            />
          </Col>
          <Col className="ps-5 pt-5" md={6}>
            <h2 className="heading_color " style={{ fontFamily: "'Aref Ruqaa', serif" }}>Example Heading</h2>
            <p className="my-5" style={{ fontFamily: "'Aref Ruqaa', serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet consectetur dolor in elementum. Nulla vehicula lorem nec neque scelerisque, a malesuada risus aliquet. Integer in dignissim urna. Donec eget risus varius, ullamcorper magna nec, fringilla nisl.
            </p>
            <button className="BioButton  mt-5 pt-5">Read More ...</button>
          </Col>
        </Row>
      </Container>
    )
  
  
  
  
  
  
  

    const ProjectSection = () => (
      <div className="container mb-5 pb-5">
        <h1 className="my-5 py-5"><span className=" bigText ">Exterior</span> <span className="smallText">Projects</span></h1>
  
  
        <div className="row g-4">
          {projectData.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <div className="image-item">
                <img src={project.imageUrl} alt={project.title} className="img-fluid" />
                <div className="overlay">
                  <div className="overlay-text">
                    <h3>{project.title}</h3>
                    <p>{project.details}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
    )
  
  
  
  
  
  
  
  
  
  
  
    return (
      <div className="g-0  body_background" style={{ maxWidth: "100vw" }}>
        <div><TopMenu /></div>
  
        <div className="container-fluid ">
          <div className="">{BioSection()}</div>
          <div>{ProjectSection()}</div>
          <div id="contact"><Footer /></div>
        </div>
      </div>
    )
  }

export default Architecture
