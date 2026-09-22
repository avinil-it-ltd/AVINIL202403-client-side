
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
                        zIndex: 1050,
                    }}
                >
                    <i className="bi bi-arrow-up text-white"></i>
                </Button>
            )}
        </div>
    );
};

export default PageUpButton;