import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const UserServices = () => {

  const [services, setServices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: true,
    });

    fetchServices();

  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/service");
      setServices(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container className="mt-5">

      <h2 className="text-center mb-5">Our Services</h2>

      <Row>

        {services.map((service, index) => (

          <Col md={6} lg={4} key={service._id} className="mb-4">

            <motion.div
              className="item-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >

              <div
                className="item-image-container"
                onClick={() =>
                  handleImageClick(
                    `http://localhost:8000/api/admin/uploads/${service.serviceImage}`
                  )
                }
              >
                <img
                  src={`http://localhost:8000/api/admin/uploads/${service.serviceImage}`}
                  alt={service.serviceName}
                  className="item-image"
                />
              </div>

              <div className="item-details">

                <h3 className="item-name">{service.serviceName}</h3>

                <p className="item-description">{service.description}</p>

                <div className="item-meta">

                  <div>
                    <span className="meta-label">Price</span>
                    <span className="meta-value">
                      ₹{service.price}
                    </span>
                  </div>

                  <div>
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">
                      {service.duration}
                    </span>
                  </div>

                </div>

              </div>

            </motion.div>

          </Col>

        ))}

      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="text-center">
          {selectedImage && (
            <img src={selectedImage} alt="" className="img-fluid" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default UserServices;