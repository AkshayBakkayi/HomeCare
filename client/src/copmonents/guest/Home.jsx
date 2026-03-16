import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
 FaUserNurse,
 FaHeartbeat,
 FaVials,
 FaHospitalUser,
 FaAmbulance
} from "react-icons/fa";


const iconMap = {
 FaUserNurse,
 FaHeartbeat,
 FaVials,
 FaHospitalUser,
 FaAmbulance
};


const GuestHome = () => {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);


  const fetchServices = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/api/admin/service"
      );

      setServices(res.data.data);

    } catch (error) {
      console.log(error);
    }

  };


  return (
    <>
      <style>
        {`
        /* HERO */

        .hero-section{
            background:url("/assets/624116.jpg") center/cover no-repeat;
            padding:160px 0;
            color:white;
            position:relative;
            border-radius:15px;
            margin:30px 0;
        }

        .hero-section::before{
            content:"";
            position:absolute;
            inset:0;
            background:rgba(0,0,0,0.6);
            border-radius:15px;
        }

        .hero-section .container{
            position:relative;
            z-index:2;
        }

        .hero-title{
            font-size:48px;
            font-weight:700;
        }

        .hero-subtitle{
            font-size:20px;
            margin-top:15px;
            color:#f1f1f1;
        }

        /* SECTION TITLE */

        .section-title{
            text-align:center;
            font-size:36px;
            font-weight:700;
            margin-bottom:40px;
        }

        /* SERVICES */

        .services-section{
            padding:80px 0;
        }

        .service-card{
            border:none;
            background:rgba(24, 189, 15, 0.08);
            border-radius:12px;
            padding:25px;
            height:100%;
            transition:0.3s;
            box-shadow:0 4px 15px rgba(0,0,0,0.08);
        }

        .service-card:hover{
            transform:translateY(-8px);
            box-shadow:0 10px 25px rgba(0,0,0,0.15);
        }

        .service-icon{
            font-size:42px;
            color:#0d6efd;
            margin-bottom:15px;
        }

        .service-list{
            list-style:none;
            padding:0;
            margin-top:10px;
        }

        .service-list li{
            margin-bottom:6px;
            color:#555;
        }

        /* WHY SECTION */

        .why-section{
            padding:10px 0;
        }

        .why-section ul{
            list-style:none;
            padding:0;
            font-size:18px;
            line-height:2;
        }

        /* CTA */

        .cta-section{
            background:#2c3e50;
            color:white;
            padding:80px 0;
            text-align:center;
            border-radius:15px;
            margin-bottom:40px;
        }

        .cta-button{
            margin-top:20px;
            padding:12px 30px;
            font-size:18px;
            border-radius:30px;
        }

        `}
      </style>


      {/* HERO SECTION */}

      <div className="hero-section text-center">

        <Container>

          <h1 className="hero-title">
            Welcome to Home Care
          </h1>

          <p className="hero-subtitle">
            Professional healthcare services at your doorstep.
            Safe, Reliable, and Affordable.
          </p>

          <Button
            variant="warning"
            size="lg"
            className="mt-4"
            onClick={() => navigate("/team")}
          >
            Book Now
          </Button>

        </Container>

      </div>


      {/* SERVICES */}

      <div className="services-section">

        <Container>

          <h2 className="section-title">
            Our Services
          </h2>

          <Row className="g-4">

            {services.slice(0,3).map(service => {

              const Icon = iconMap[service.icon];

              return (

                <Col md={4} key={service._id}>

                  <Card className="service-card text-center">

                    <Card.Body>

                      {Icon && <Icon className="service-icon" />}

                      <h5>{service.serviceName}</h5>

                      <ul className="service-list">

                        {(service.description || []).map((item,i)=>(
                          <li key={i}>{item}</li>
                        ))}

                      </ul>

                    </Card.Body>

                  </Card>

                </Col>

              );

            })}

          </Row>

        </Container>

      </div>


      {/* WHY CHOOSE US */}

      <Container className="why-section">

        <h2 className="section-title">
          Why Choose HomeCare?
        </h2>

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
              style={{
                width:"100%",
                borderRadius:"15px"
              }}
            />

          </Col>

        </Row>

      </Container>


      {/* CTA */}

      <div className="cta-section">

        <Container>

          <h2>Need Immediate Assistance?</h2>

          <p>
            Book your appointment now and get healthcare at your home.
          </p>

          <Button
            variant="warning"
            className="cta-button"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>

        </Container>

      </div>

    </>
  );
};

export default GuestHome;