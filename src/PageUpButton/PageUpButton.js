
import "./pageUpButton.css"
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
const PageUpButton = () => {

    const [showScroll, setShowScroll] = useState(false);

    // Toggle scroll-up button visibility based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return (
        <div>
            {/* Scroll-to-top button */}
            {showScroll && (
                <Button
                    onClick={scrollToTop}
                    className="scroll-top-btn position-fixed"
                    style={{
                        bottom: '30px',
                        right: '30px',
                        backgroundColor: '#191919',
                        borderRadius: '50%',
                        padding: '10px 12px',
                    }}
                >
                    <i className="bi bi-arrow-up text-white"></i>
                </Button>
            )}

            {/* Orange Sidebar */}
            <div
                className="sidebar position-fixed d-none d-md-block"
                style={{
                    top: '0',
                    right: '0',
                    width: '60px',
                    height: '100%',
                    backgroundColor: 'orange',
                }}
            >
                <div className="d-flex flex-column align-items-center pt-3">
                    <i className="bi bi-house-fill mb-4 text-white" style={{ fontSize: '1.5rem' }}></i>
                    <i className="bi bi-person-fill mb-4 text-white" style={{ fontSize: '1.5rem' }}></i>
                    <i className="bi bi-envelope-fill mb-4 text-white" style={{ fontSize: '1.5rem' }}></i>
                    <i className="bi bi-gear-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                </div>
            </div>

            {/* Main content to make the page scrollable */}
            {/* <div className="container mt-5 pt-5">
                <h1>Scroll Down to See the Scroll-Up Button</h1>
                <p style={{ height: '2000px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at urna quis nulla vehicula fermentum. Curabitur...
                </p>
            </div> */}
        </div>
    );
};

export default PageUpButton;