import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const GuestFooter = () => {
  return (
    <>
      <style>
        {`
        .footer {
          background-color: #0f2027;
          color: white;
          padding: 60px 0 20px 0;
          margin-top: 15px;
          border-radius: 10px;
        }

        .footer h5 {
          font-weight: bold;
          margin-bottom: 20px;
        }

        .footer-link {
          display: block;
          color: #ccc;
          text-decoration: none;
          margin-bottom: 10px;
          transition: 0.3s ease;
        }

        .footer-link:hover {
          color: #ffc107;
          padding-left: 5px;
        }

        .social-icon {
          color: white;
          margin-right: 15px;
          font-size: 18px;
          transition: 0.3s ease;
          cursor: pointer;
        }

        .social-icon:hover {
          color: #ffc107;
          transform: scale(1.2);
        }

        .footer-bottom {
          border-top: 1px solid #444;
          margin-top: 30px;
          padding-top: 15px;
          text-align: center;
          font-size: 14px;
          color: #aaa;
        }

        /* Mobile only */
        @media (max-width: 768px) {
          .footer {
            padding: 20px 0;
            border-radius: 0;
          }
        }
        `}
      </style>

      <footer className="footer">
        <Container>

          {/* ================= DESKTOP FOOTER ================= */}
          <div className="d-none d-md-block">
            <Row>
              {/* About */}
              <Col md={4} className="mb-4">
                <h5>HomeCare</h5>
                <p>
                  Providing professional and reliable home healthcare services.
                  Your health and comfort are our priority.
                </p>
              </Col>

              {/* Quick Links */}
              <Col md={2} className="mb-4">
                <h5>Quick Links</h5>
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/about" className="footer-link">About</Link>
                <Link to="/services" className="footer-link">Services</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
              </Col>

              {/* Services */}
              <Col md={3} className="mb-4">
                <h5>Our Services</h5>
                <span className="footer-link">Doctor Consultation</span>
                <span className="footer-link">Nursing Care</span>
                <span className="footer-link">Physiotherapy</span>
                <span className="footer-link">Elderly Care</span>
              </Col>

              {/* Contact */}
              <Col md={3} className="mb-4">
                <h5>Contact Us</h5>
                <p>Email: support@homecare.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Location: Sankeshwar, India</p>

                <div>
                  <FaFacebookF className="social-icon" />
                  <FaTwitter className="social-icon" />
                  <FaInstagram className="social-icon" />
                  <FaLinkedin className="social-icon" />
                </div>
              </Col>
            </Row>
          </div>

          {/* ================= MOBILE FOOTER ================= */}
          <div className="d-block d-md-none text-center footer-bottom">
            © {new Date().getFullYear()} HomeCare. All Rights Reserved.
          </div>

          {/* Desktop Copyright */}
          <div className="d-none d-md-block footer-bottom">
            © {new Date().getFullYear()} HomeCare. All Rights Reserved.
          </div>

        </Container>
      </footer>
    </>
  );
};

export default GuestFooter;
