import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel"; // Import the Carousel component
import banner1 from "../src/assets/images/banner1.jpg";
import banner2 from "../src/assets/images/banner2.jpg";
import banner3 from "../src/assets/images/banner3.jpg";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import TopMenu from "./core/TopMenu";
import Footer from "./core/footer";
import "./App.css";

const customCaurosel = () => {
  const ZoomIn = styled.div`
    animation: 3s ${keyframes`${zoomIn}`};
  `;

  // Auto-sliding carousel for top banners
  const topCarousel = () => (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
    >
      <div>
        <img className="img-fluid" src={banner1} alt="Banner 1" />
        <div className="carousel-caption absolute d-none d-md-block">
          <h3>Welcome To 3P Communication</h3>
          <p>Best platform to hire designers in Bangladesh</p>
        </div>
      </div>
      <div>
        <img className="img-fluid" src={banner2} alt="Banner 2" />
        <div className="carousel-caption absolute d-none d-md-block">
          <h3>Innovative Design Solutions</h3>
          <p>Transforming Spaces with Creativity and Precision</p>
        </div>
      </div>
      <div>
        <img className="img-fluid" src={banner3} alt="Banner 3" />
        <div className="carousel-caption absolute d-none d-md-block">
          <h3>Exceptional Project Management</h3>
          <p>Delivering Quality Designs on Time and Within Budget</p>
        </div>
      </div>
    </Carousel>
  );

  return (
    <div>
      <TopMenu />
      {topCarousel()}
      {/* Rest of the sections */}
      <Footer />
    </div>
  );
};

export default customCaurosel;
