import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Card } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const UserTeam = () => {
   const [teams, setTeams] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });

    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/team");
      setTeams(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container className="py-5">

      <h2 className="text-center fw-bold mb-5">Meet Our Experts</h2>

      <Row className="g-4">

        {teams.map((team, index) => (
          <Col xs={12} sm={6} lg={4} key={team._id}>

            <motion.div
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.15 }}
            >

              <Card className="team-card shadow-sm border-0">

                <div
                  className="team-img-wrapper"
                  onClick={() =>
                    handleImageClick(
                      `http://localhost:8000/uploads/${team.photo}`
                    )
                  }
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/uploads/${team.photo}`}
                    alt={team.name}
                    className="team-img"
                  />
                </div>

                <Card.Body className="text-center">

                  <Card.Title className="fw-semibold">
                    {team.name}
                  </Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    {team.role}
                  </Card.Subtitle>

                  <p className="small text-muted">
                    {team.experience} Years Experience
                  </p>

                  <Card.Text className="team-desc">
                    {team.description}
                  </Card.Text>

                </Card.Body>

              </Card>

            </motion.div>

          </Col>
        ))}

      </Row>

      {/* Image Modal */}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Body className="text-center p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Team"
              className="img-fluid w-100"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}

      <style>{`

  .team-card {
    border-radius: 12px;
    transition: all 0.25s ease;
    overflow: hidden;
    max-width: 320px;
    margin: auto;
  }

  .team-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  }

  .team-img-wrapper {
    height: 180px;
    overflow: hidden;
    cursor: pointer;
  }

  .team-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .team-img-wrapper:hover .team-img {
    transform: scale(1.05);
  }

  .card-body {
    padding: 14px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-subtitle {
    font-size: 0.85rem;
  }

  .team-desc {
    font-size: 0.8rem;
    color: #6c757d;
    min-height: 50px;
  }

  @media (max-width: 768px) {
    .team-img-wrapper {
      height: 160px;
    }
  }

`}</style>

    </Container>
  );
};

export default UserTeam;

