import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
import { listProjects, getSearchProject } from "./core/apicalls"
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import TopMenu from "./core/TopMenu"
import Footer from "./core/footer"
import Data from "./projects.json"
import { Container, Col, Row } from "react-bootstrap"
import './App.css';
import bioImg from "../src/assets/images/interiorPage/bioImg.jpg"


const Design = (props) => {
  const theme = '#191919'
  const [projects, setProjects] = useState([])


  const ZoomIn = styled.div`animation:3s ${keyframes`${zoomIn}`}`



  const listAllProjects = () => {
    setProjects(Data)
  }

  useEffect(() => {
    listAllProjects()
  }, [props])




  const projectData = [
    { id: 1, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 1', details: 'Details about Project 1' },
    { id: 2, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 2', details: 'Details about Project 2' },
    { id: 3, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 3', details: 'Details about Project 3' },
    { id: 4, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 4', details: 'Details about Project 4' },
    { id: 5, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 4', details: 'Details about Project 4' },
    { id: 6, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 4', details: 'Details about Project 4' },
    { id: 7, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 4', details: 'Details about Project 4' },
    { id: 8, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 4', details: 'Details about Project 4' },
    { id: 9, imageUrl: 'https://img.freepik.com/free-photo/handcrafted-wooden-decorative-sculpture_23-2151003083.jpg?t=st=1723099247~exp=1723102847~hmac=a911f1422e1deed24f5d932c82064cb0998a3584e278a4af210f7a44a42c7d38&w=996', title: 'Project 4', details: 'Details about Project 4' },
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
      <h1 className="my-5 py-5"><span className=" bigText ">Event</span> <span className="smallText">Projects</span></h1>


      <div className="row g-4">
        {/* {projectData.map((project) => (
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
          ))} */}

        <h1 className="my-5 py-5   text-center">Projects Coming Soon!</h1>

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

export default Design
