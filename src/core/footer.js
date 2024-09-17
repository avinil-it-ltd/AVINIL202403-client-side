import React from "react"
import facebookImg from '../assets/images/facebook.png'
import youtubeImg from '../assets/images/youtube.png'
import whatsappImg from '../assets/images/whatsapp.png'
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {

  return (
    <div>

      <div>
        <footer className="footerColor text-white pt-5 pb-3">
          <Container>
            <Row>

              <Col md={4} className="mb-4 mb-md-0">
                <h5>Important Links</h5>
                <ul className="list-unstyled mt-3">
                  <li><a href="/aboutus" className="text-white  text-decoration-none">About Us</a></li>
                  <li className="my-2"><a href="/contactus" className="text-white  text-decoration-none">Contact Us</a></li>
                  <li className="my-2"> <a href="/privacyPolicy" className="text-white mt-2 text-decoration-none">Privacy Policy</a></li>
                </ul>
              </Col>

              <Col md={4}>
                <h5>Contact Us</h5>
                <p className="mt-3">Email: 3pcommunication@gmail.com</p>
                <p>Phone: +8801819139975</p>
              </Col>



              <Col md={4} className="mb-4 mb-md-0">
                <div className="">
                  <label htmlFor="subscriberEmail callNow_font">Subscribe to our newsletter </label>
                  <div className="input-group mt-2">
                    <input
                      type="email"
                      id="subscriberEmail"
                      name="subscriberEmail"
                      className="form-control p-3"
                      placeholder="Enter your email"
                    />
                    <button className="btn subscribeButton " type="button">Subscribe</button>
                  </div>
                </div>

                <div className="mt-4 ">
                  <a href="https://www.facebook.com/3PCommunication" target="_blank" className=" text-white  me-3"><img className="" width="30px" src={facebookImg} alt="" /></a>
                  <a href="https://whatsapp.com" target="_blank" className="ms-2 text-white  me-3"><img className="" width="30px" src={whatsappImg} alt="" /></a>
                  <a href="https://www.youtube.com/@3pcommunication569" target="_blank" className="ms-2 text-white  me-3"><img className="" width="30px" src={youtubeImg} alt="" /></a>
                </div>
              </Col>



            </Row>


          </Container>
          <hr />
          <div className="footerColor text-white text-center fw-bold ">
            <div className="text-center mx-5 pt-3 " >
              <p> &copy; 3p Communication All Right Reserved </p>

            </div>
          </div>
        </footer>
      </div>

    </div>
  )
}

export default Footer
