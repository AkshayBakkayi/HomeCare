import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #f8fbff, #eef6ff)",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Container className="d-flex justify-content-center">
        <Card
          className="shadow-lg border-0 p-4"
          style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}
        >
          <Card.Body>

            {/* Title */}
            <h2 className="fw-bold text-primary text-center mb-4">
              Contact Us
            </h2>

            {/* Location */}
            <div className="mb-3">
              <FaMapMarkerAlt className="text-danger me-2" />
              <strong>Location:</strong><br />
              Sankeshwar, Belgavi District – 591313
            </div>

            {/* Phone */}
            <div className="mb-3">
              <FaPhone className="text-primary me-2" />
              <strong>Phone / WhatsApp:</strong><br />
              7996854822
            </div>

            {/* Timings */}
            <div className="mb-4">
              <FaClock className="text-success me-2" />
              <strong>Timings:</strong><br />
              5 PM – 9 PM <br />
              <span className="text-danger">Tuesday Closed</span>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-3">
              <Button
                variant="success"
                href="https://wa.me/918867560289"
                target="_blank"
              >
                <FaWhatsapp className="me-2" />
                Chat on WhatsApp
              </Button>

              <Button
                variant="primary"
                href="tel:7996854822"
              >
                <FaPhone className="me-2" />
                Call Now
              </Button>
            </div>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Contact;
