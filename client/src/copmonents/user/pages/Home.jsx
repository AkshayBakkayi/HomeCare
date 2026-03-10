import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
        /* ---------------- HERO SECTION ---------------- */
        .hero-section {
            background: url("/assets/624116.jpg") center center/cover no-repeat;
            color: white;
            padding: 160px 0;
            position: relative;
            border-radius: 15px;
            margin: 30px 0;
        }

        .hero-section::before {
            content: "";
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 15px;
        }

        .hero-section .container {
            position: relative;
            z-index: 2;
        }

        .hero-title {
            font-size: 48px;
            font-weight: 700;
        }

        .hero-subtitle {
            font-size: 20px;
            margin-top: 20px;
            color: #f0f0f0;
        }

        /* ---------------- SERVICES SECTION ---------------- */
        .services-section {
            background-color: #f4f6f8;
            padding: 80px 0;
        }

        .section-title {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 60px;
            text-align: center;
            color: #1f2d3d;
        }

        .service-card {
            border-radius: 20px;
            border: 1px solid #e0e0e0;
            background-color: #ffffff;
            padding: 40px 25px;
            text-align: center;
            height: 100%;
            min-height: 320px;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        .service-card h5 {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 25px;
        }

        .service-card p {
            margin: 8px 0;
            font-size: 16px;
            color: #444;
        }

        /* ---------------- WHY CHOOSE US ---------------- */
        .why-section {
            padding: 80px 0;
        }

        .why-section ul {
            font-size: 18px;
            line-height: 2;
        }

        /* ---------------- CTA SECTION ---------------- */
        .cta-section {
            background-color: #2c3e50;
            color: white;
            padding: 80px 0;
            text-align: center;
            border-radius: 15px;
            margin-bottom: 40px;
        }

        .cta-button {
            margin-top: 20px;
            padding: 12px 30px;
            font-size: 18px;
            border-radius: 30px;
        }
        `}
      </style>

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="hero-section text-center">
        <Container>
          <h1 className="hero-title">Welcome to Home Care</h1>
          <p className="hero-subtitle">
            Professional healthcare services at your doorstep.
            Safe, Reliable, and Affordable.
          </p>
          <Button
            variant="warning"
            size="lg"
            className="mt-4"
            onClick={() => navigate("/services")}
          >
            Explore Services
          </Button>
        </Container>
      </div>

      {/* ---------------- SERVICES SECTION ---------------- */}
      <div className="services-section">
        <Container>
          <h2 className="section-title">Our Services</h2>

          <Row className="g-4">
            <Col md={4}>
              <Card className="service-card">
                <Card.Body>
                  <h5>Community Health Nursing</h5>
                  <p>Medicine Administration</p>
                  <p>Injections</p>
                  <p>Counselling</p>
                  <p>Post Operative Care</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="service-card">
                <Card.Body>
                  <h5>All types of physiotherapy with advanced technology</h5>
                  <p>Orthopedic Physiotherapy</p>
                  <p>Neurological Physiotherapy</p>
                  <p>Post-operative Rehabilitation</p>
                  <p>Pain Management</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="service-card">
                <Card.Body>
                  <h5>Lab Technician Services</h5>
                  <p>Home Sample Collection</p>
                  <p>Safe & Hygienic Process</p>
                  <p>Reports Shared Digitally</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <Container className="why-section">
        <h2 className="section-title">Why Choose HomeCare?</h2>
        <Row className="align-items-center">
          <Col md={6}>
            <ul>
              <li>✔ Certified & Verified Professionals</li>
              <li>✔ 24/7 Support</li>
              <li>✔ Affordable Pricing</li>
              <li>✔ Quick Appointment Booking</li>
              <li>✔ Safe & Hygienic Services</li>
            </ul>
          </Col>
          <Col md={6}>
            <img
              src="/assets/Home-Care-Oldbury.jpeg"
              alt="Healthcare"
              style={{ width: "100%", borderRadius: "15px" }}
            />
          </Col>
        </Row>
      </Container>

      {/* ---------------- CTA SECTION ---------------- */}
      <div className="cta-section">
        <Container>
          <h2>Need Immediate Assistance?</h2>
          <p>Book your appointment now and get healthcare at your home.</p>
          <Button
            variant="warning"
            className="cta-button"
            onClick={() => navigate("/user/appointment")}
          >
            Get Started
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Home;
