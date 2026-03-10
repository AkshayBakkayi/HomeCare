import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const Appointment = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #f8fbff, #eef6ff)",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "60px",
      }}
    >
      <Container className="d-flex justify-content-center">
        <Card
          className="shadow-lg border-0 text-center p-4"
          style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
        >
          <Card.Body>
            <h2 className="fw-bold text-primary mb-3">
              Book Your Appointment
            </h2>

            <p className="text-muted mb-4">
              Book your appointment instantly via WhatsApp.  
              Our healthcare team will respond quickly.
            </p>

            <h4 className="mb-4 text-dark">
              📞 7996854822
            </h4>

            {/* WhatsApp Button */}
            <Button
              variant="success"
              className="w-100 mb-3 py-2"
              href="https://wa.me/917996854822"
              target="_blank"
            >
              <FaWhatsapp className="me-2" />
              Chat on WhatsApp
            </Button>

            {/* Call Button */}
            <Button
              variant="primary"
              className="w-100 py-2"
              href="tel:7996854822"
            >
              <FaPhone className="me-2" />
              Call Now
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Appointment;
