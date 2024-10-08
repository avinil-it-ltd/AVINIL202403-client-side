import React, { useState, useEffect, useRef } from "react"
import TopMenu from "../../core/TopMenu"
import Footer from "../../core/footer"
import Data from "../../projects.json"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import profile from '../../assets/images/about/ceo.png'
import projectComplete from '../../assets/images/project.png'
import award from '../../assets/images/award.png'
import client from '../../assets/images/happyClient.png'
import servicespic from '../../assets/images/customer-service.png'
import centralPic from '../../assets/images/about/central.jpg'


const AboutUs = (props) => {


  const [projects, setProjects] = useState([])
  const ZoomIn = styled.div`animation:3s ${keyframes`${zoomIn}`}`

  const listAllProjects = () => {
    setProjects(Data)
  }

  useEffect(() => {
    listAllProjects()
  }, [props])




  const process = () => (
    <div className="mt-0" style={{ height: "auto" }}>
      <div style={{ opacity: "0.9", height: "auto" }}>
        <h1 className="text-center mt-0 p-5 heading_color" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Our Process</h1>
        <div className="row p-5 " >
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={projectComplete} alt="" /> </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>200+ PROJECTS CCOMPLETED</div>
          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={award} alt="" /> </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>5 AWARDS RECEIVED</div>

          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={client} alt="" /> </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>175+ HAPPY CUSTOMERS</div>

          </div>
          <div className="col-12 col-md-3 text-center p-2">
            <div className=" mx-auto  row align-items-center" style={{ height: "150px", width: "150px" }}> <img src={servicespic} alt="" /> </div>
            <div className="mt-4 h5 heading_color text-center" style={{ fontFamily: "'Aref Ruqaa', serif" }}>15 YEARS IN SERVICE</div>

          </div>
        </div>
      </div>
    </div>
  )




  const ChooseMe = () => (

    <div className="container my-5 pt-5">
      <h2 className="heading_color py-5 ">Why Choose Us? </h2>


      <div className="row justify-content-center align-items-center">
        {/* Left Circle Sections */}
        <div className="col-4 ">
          <div className="circle-section mb-4 d-flex justify-content-around align-items-center ">
            <img
              src={centralPic}
              alt="Left Circle"
              className="circle-img bgCircle"
            />
            <div className="text-start ps-3">
              <h4>Left Heading</h4>
              <p>This is a small paragraph for the left section.</p>
            </div>
          </div>


          <div className="circle-section mb-4 d-flex justify-content-around align-items-center ">
            <img
              src={centralPic}
              alt="Left Circle"
              className="circle-img bgCircle"
            />
            <div className="text-start ps-3">
              <h4>Left Heading</h4>
              <p>This is a small paragraph for the left section.</p>
            </div>
          </div>


          <div className="circle-section mb-4 d-flex justify-content-around align-items-center ">
            <img
              src={centralPic}
              alt="Left Circle"
              className="circle-img bgCircle"
            />
            <div className="text-start ps-3">
              <h4>Left Heading</h4>
              <p>This is a small paragraph for the left section.</p>
            </div>
          </div>

        </div>







        {/* Center Circle Image with Border */}
        <div className="col-4 text-center">
          <div className="center-circle-container">
            <img
              src={centralPic}
              alt="Center Circle"
              className="center-circle"
            />
          </div>
        </div>






        {/* Right Circle Sections */}
        <div className="col-4 text-center">


          <div className="circle-section mb-4 d-flex justify-content-around align-items-center ">
            <img
              src={centralPic}
              alt="Left Circle"
              className="circle-img bgCircle"
            />
            <div className="text-start ps-3">
              <h4>Left Heading</h4>
              <p>This is a small paragraph for the left section.</p>
            </div>
          </div>


          <div className="circle-section mb-4 d-flex justify-content-around align-items-center ">
            <img
              src={centralPic}
              alt="Left Circle"
              className="circle-img bgCircle"
            />
            <div className="text-start ps-3">
              <h4>Left Heading</h4>
              <p>This is a small paragraph for the left section.</p>
            </div>
          </div>



          <div className="circle-section mb-4 d-flex justify-content-around align-items-center ">
            <img
              src={centralPic}
              alt="Left Circle"
              className="circle-img bgCircle"
            />
            <div className="text-start ps-3">
              <h4>Left Heading</h4>
              <p>This is a small paragraph for the left section.</p>
            </div>
          </div>



        </div>
      </div>
    </div>
  )

  return (
    <div className="container" style={{ maxWidth: "100vw" }}>
      <div><TopMenu /></div>


      <div className="row">
        <div className="col-12 pt-5 mt-5 mt-md-0 overflow-auto " >
          <p className="text-center "> <img className="" src={profile} width="25%" height="25%"></img></p>
          <p className="h4 text-center heading_color mb-0" style={{ fontFamily: "'Aref Ruqaa', serif" }}>Prokash Banik</p>
          <p className="h6 text-center text-black mt-0" style={{ fontFamily: "'Aref Ruqaa', serif" }}>CEO, 3P Communication</p>
          <h3 className="text-center heading_color mt-5 mb-3 " style={{ fontFamily: "'Aref Ruqaa', serif" }}>Get To Know Our Director</h3>
          <div className="my-auto col-12  col-xl-9 mx-auto text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet fugit quod iure dolores ad aliquam sequi dicta possimus asperiores? Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio cumque eum earum
            pariatur dolores accusamus similique cum consectetur sunt doloremque!</div>
        </div>
      </div>


      <div>{ChooseMe()}</div>
      <div>{process()}</div>
      <div id="contact" className="g-0"><Footer /></div>
    </div>
  )
}

export default AboutUs
