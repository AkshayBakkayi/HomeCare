import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  House,
  Grid,
  CalendarCheck,
  People,
  Envelope,
  PersonPlus,
  BoxArrowInRight
} from "react-bootstrap-icons";

const GuestNavbar = () => {
  return (
    <>
      <style>
        {`
        .custom-navbar {
          background-color: #2a7035;
          padding: 14px 0;
          border-bottom: 1px solid #e5e5e5;
        }

        .brand-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-title {
          font-weight: 700;
          font-size: 20px;
          color: #e1e7ec;
          line-height: 1.2;
        }

        .brand-subtitle {
          font-size: 14px;
          color: #ffffff;
        }

        .nav-link-custom {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #e6ebf0 !important;
          padding: 8px 14px !important;
          margin: 0 5px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-link-custom:hover {
          background-color: #e8f4f8;
          color: #0d6efd !important;
        }

        /* Active Route Highlight */
        .nav-link-custom.active {
          background-color: #ffffff;
          color: #2a7035 !important;
          font-weight: 600;
        }

        .book-btn {
          background-color: #93cde2 !important;
          border: none !important;
          color: #2c3e50 !important;
          font-weight: 600;
          border-radius: 50px;
          padding: 8px 22px;
          margin-left: 15px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .book-btn:hover {
          background-color: #7bb8d4 !important;
          transform: translateY(-2px);
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background: #ffffff;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 10px;
          }

          .nav-link-custom {
            margin: 6px 0;
            color: #2c3e50 !important;
          }

          .nav-link-custom.active {
            background-color: #2a7035;
            color: #ffffff !important;
          }

          .book-btn {
            width: 100%;
            justify-content: center;
            margin: 10px 0 0 0;
          }
        }
        `}
      </style>

      <Navbar expand="lg"
        className="custom-navbar"
        collapseOnSelect
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000
        }}>
        <Container>

          {/* Brand */}
          <Navbar.Brand as={NavLink} to="/home" className="brand-wrapper">
            <img
              src="/assets/logo.jpeg"
              alt="HomeCare Logo"
              width="60"
              height="60"
              style={{ borderRadius: "50%" }}
            />
            <div>
              <div className="brand-title">Home Care</div>
              <div className="brand-subtitle">Sankeshwar</div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-lg-center">

              <Nav.Link as={NavLink} to="/home" className="nav-link-custom">
                <House size={18} />
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/services" className="nav-link-custom">
                <Grid size={18} />
                Services
              </Nav.Link>

              <Nav.Link as={NavLink} to="/team" className="nav-link-custom">
                <People size={18} />
                Team
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contact" className="nav-link-custom">
                <Envelope size={18} />
                Contact
              </Nav.Link>

              <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
                <CalendarCheck size={18} />
                Appointment
              </Nav.Link>

              {/* Updated Icons */}
              <Nav.Link as={NavLink} to="/register" className="nav-link-custom">
                <PersonPlus size={18} />
                Register
              </Nav.Link>

              <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
                <BoxArrowInRight size={18} />
                Login
              </Nav.Link>

              {/* Book Now */}
              <Button as={NavLink} to="/login" className="book-btn">
                <CalendarCheck size={16} />
                Book Now
              </Button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default GuestNavbar;